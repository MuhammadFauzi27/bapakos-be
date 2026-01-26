import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import mainRoute from "./routes/index.js"
import errorMiddleware from "./middlewares/errorMiddleware.js"
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from "path";
import { fileURLToPath } from 'url';

const App = () => {
  const app = express()
  const swaggerDocument = YAML.load('./docs/openapi.yaml');

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan("dev"))
  app.use(helmet({
    crossOriginResourcePolicy: false,
  }))
  app.use(cors())
  app.use('/uploads', (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  });

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use('/api', mainRoute)
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  app.use(errorMiddleware)

  return app
}

export default App