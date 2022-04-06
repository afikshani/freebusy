#!/bin/sh

runService() {
      service_name=$(printenv serviceName)
      if [ "$service_name" = "growth_explorer" ]; then
        echo "Starting Growth Explorer"
		    npm run growthExplorer
	else
	    echo "starting Filter Service"
		  npm start
	fi
}

# get configs from DynamoDB based on environment and service_name
npm run readDynamo

# execute the start script
npm run build
npm run postBuild
runService