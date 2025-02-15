/* eslint-disable-line */

const aws = require("aws-sdk");

exports.handler = async (event, context, callback) => {
  const cognitoProvider = new aws.CognitoIdentityServiceProvider({
    apiVersion: "2016-04-18",
  });

  let isAdmin = false;
  const adminEmails = ["izanami369@gmail.com"];

  if (adminEmails.indexOf(event.request.userAttributes.email) !== -1) {
    isAdmin = true;
  }

  if (isAdmin) {
    const groupParams = {
      GroupName: "Admin",
      UserPoolId: event.userPoolId,
    };
    const userParams = {
      GroupName: "Admin",
      UserPoolId: event.userPoolId,
      Username: event.username,
    };
  }

  try {
    await cognitoProvider.getGroup(groupParams).promise();
  } catch (e) {
    await cognitoProvider.createGroup(groupParams).promise();
  }

  try {
    await cognitoProvider.adminAddUserToGroup(userParams).promise();
    callback(null, event);
  } catch (e) {
    callback(e);
  } 
};
