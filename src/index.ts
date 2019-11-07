import * as core from '@actions/core'
import Lambda from 'aws-sdk/clients/lambda'
import fs from 'fs'

async function run() {
    try {
        const FunctionName = core.getInput('function_name', { required: true })
        const zipFile = core.getInput('zip_file', { required: true })
        const publish: boolean = core.getInput('publish')
            ? Boolean(core.getInput('publish'))
            : false

        const lambdaConfig: Lambda.Types.ClientConfiguration = {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            apiVersion: '2015-03-31',
            maxRetries: 2,
            region: process.env.AWS_REGION,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            sslEnabled: true,
        }

        const lambda = new Lambda(lambdaConfig)

        core.info('Function Updating...')

        const response = await lambda
            .updateFunctionCode({
                FunctionName,
                ZipFile: fs.readFileSync(zipFile),
            })
            .promise()

        core.info(
            `Update Success : ${response.FunctionName} RevisionId = ${response.RevisionId} CodeSize = ${response.CodeSize}`
        )

        if (publish) {
            core.info('Publishing...')
            await lambda
                .publishVersion({
                    FunctionName,
                })
                .promise()
            core.info('Publish Success')
        }
    } catch (error) {
        core.setFailed(error)
    }
}

run()
