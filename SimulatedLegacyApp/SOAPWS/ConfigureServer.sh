#Download all the solution and install in the system
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts

#Check the version of the Nodejs installed
node --version 

#Install git
sudo yum update -y
sudo yum install git -y

#Verify the git version
git --version

#Then clone the code to your EC2 instance and folder
git clone https://github.com/aws-samples/soap-to-serverless-modern-infrastructure-for-mature-apis.git
