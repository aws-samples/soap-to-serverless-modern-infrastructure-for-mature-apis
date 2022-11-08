# SimulatedLegacyApp/SOAPWS

## How to configure server after cloudformation deployment

After the Infrastructure created by the Cloudformation template using template.yaml the ConfigureServer.sh needs to be used inside of the server for NodeJS and code configuration. Your EC2 instance will connect to the git repository and download all the code and project.

## Grant permissions to the ConfigureServer.sh

To execute the script permissions must be granted:

```bash
chmod +x ConfigureServer.sh
```

## Troubleshooting

Sometimes between the CURL execution of the script and nvm the SSH console needs to be refreshed. If Node is not running after the sh execution, please execute the 3 first command lines one by one manually.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts
```

## Server running

To run the server, navigate to the folder SimulatedLegacyApp\SOAPWS\BookStoreSearchService and execute the following command.

```bash
node ExportSoapWS.js
```

This command will expose the SOAP service in the following url:

```bash
https://<EC2-Instance-PublicIP>:8080/WSBookStoreEngine?wsdl
```

## Server running considerations

For demo perspective the server will only expose the SOAP API if the SSH server session is opened. The idea is to show how to migrate a SOAP API to Serverless and have backward compatibility functionality.

## Test the solution
1. Use Postman with the Postmancollection-SOAPcall.json in this project.
   https://learning.postman.com/docs/getting-started/importing-and-exporting-data/

## Cleanup

Delete the cloudformation stack will clean up all the environment.
