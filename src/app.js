import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import mainRoute from "./routes/index.js"
import errorMiddleware from "./middlewares/errorMiddleware.js"
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const App = () => {
  const app = express()
  const swaggerDocument = YAML.load('./docs/openapi.yaml');

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan("dev"))
  app.use(helmet())
  app.use(cors())

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use('/api', mainRoute)

  app.use(errorMiddleware)

  return app
}

export default App