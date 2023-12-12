/** @type {import('next').NextConfig} */

const nextConfig = {typescript : {"ignoreBuildErrors" : true},  output : "export"}

module.exports = nextConfig


/*
firebase deploy --only hosting:erperp


npx swagger-typescript-api -p https://stg-itouch-hrms.nti.hk:1243/gqw3467sdfbnm/swagger/doc.json -o ./src/apiClient --modular 


npx openapi-typescript-codegen --input https://stg-itouch-hrms.nti.hk:1243/gqw3467sdfbnm/swagger/doc.json --output ./generated





eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlYzAzMDAxLTIyOGItNDgyMi04YzM0LTBkOTlkZGNiMWE0MiIsInR5cGUiOiIwIiwiaXNzIjoibnRpaHJtcyIsImV4cCI6MTcwNTg5NzQwNn0.vbH_HwGViDpKNlsjmPszIZeqTFxL_B-_liiXDBlIl3M

*/