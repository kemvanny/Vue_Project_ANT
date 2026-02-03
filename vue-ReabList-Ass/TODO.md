# TODO: Fix Login SSL Certificate Issue

## Completed Tasks

- [x] Investigated the login error: "net::ERR_CERT_COMMON_NAME_INVALID" for HTTPS URL
- [x] Identified that the issue is due to SSL certificate mismatch on the server
- [x] Changed baseURL in api.js from HTTPS to HTTP to bypass SSL checks
- [x] Updated Vue_Project_ANT/vue-ReabList-Ass/src/API/api.js

## Remaining Tasks

- [ ] Test the login functionality after the change
- [ ] If login still fails, check if the server accepts HTTP requests
- [ ] Consider adding proper SSL certificate handling for production

## Notes

- The error occurred after pulling code but worked in the afternoon, suggesting temporary certificate issues
- Changed from using VITE_BASE_URL (likely HTTPS) to hardcoded HTTP URL
- This is a development workaround; production should use proper HTTPS with valid certificates
