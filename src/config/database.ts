// import { DynamoDB } from "aws-sdk";
import * as dynamoose from "dynamoose";

// Configures DynamoDB
const configureDB = (): void => {
  const dbInstance = new dynamoose.aws.sdk.DynamoDB({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  dynamoose.aws.ddb.set(dbInstance);
};

export default configureDB;
