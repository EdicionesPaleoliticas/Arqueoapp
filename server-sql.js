import { createApp } from './app.js'

import { SitioModel } from './models/my-sql/sitios.js'

createApp({ sitioModel: SitioModel })