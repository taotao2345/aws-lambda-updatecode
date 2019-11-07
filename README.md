# GitHub Action - AWS Lambda FunctionCode Update

Run UpdateFunctionCode , PublishVersion

# Usage

## Secret

Add Secret before this action.

- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

## Example
```yml
- name: AWS Lambda FunctionCode Update
  uses: taotao2345/aws-lambda-updatecode@v1.0.0
  env:
    AWS_REGION: ${{ secrets.AWS_REGION }}
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
  with:
    function_name: TargetFunctionName
    zip_file: path/to/file.zip
```