import { defineConfig } from 'orval'

export default defineConfig({
  evo: {
    output: {
      mode: 'tags',
      schemas: 'src/model',
      mock: false,
      prettier: true,
      clean: true,
    },
    input: {
      target:
        'http://airbnb-dev.us-east-1.elasticbeanstalk.com/swagger/v1/swagger.json',
    },
  },
})