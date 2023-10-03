# Requirements

An endpoint is being developed to compare electricity prices. This endpoint will allow users to estimate their annual costs based on electricity consumption. It is expected to interface with an external provider that offers electricity tariffs. The primary responsibility is to handle user input, perform the necessary calculations, and adapt them based on the selected tariff type.

# Solution

The solution involves implementing an Express.js application that integrates with a third-party API to retrieve electricity providers and tariffs. This application will be designed using two specific design patterns to enhance its architecture.

- Proxy Pattern: The Proxy Pattern is like a middleman. It creates a placeholder for another object to control access to it. Instead of interacting directly with the actual object, you go through the proxy, which can add extra functionality like lazy loading or access control. It's like having someone screen your calls before they reach you.

- Adapter Pattern: Makes sure the app can smoothly work with the API by bridging any interface differences and handling data translation between them.

## Endpoint: `/calculate`

### Description

This endpoint is responsible for calculating and retrieving electricity provider options based on user consumption data. It utilizes the `TraiffService` to process the calculation and obtain the provider options.

### HTTP Method

- `POST`

### Request

- **Headers:** None
- **Body:**
  - `consumption` (number, required): The user's electricity consumption in kilowatt-hours (kWh) for which provider options should be calculated.

### Responses

#### Success Response

- **Status Code:** `200 OK`
- **Content:**
  ```json
  {
    "success": true,
    "message": "Success",
    "options": [
      {
        "name": "Product A",
        "annualCost": 830
      }
    ]
  }
  ```
- **Description:** The calculation was successful, and the response contains a list of provider options based on the user's consumption.

#### Error Responses

- **Status Code:** `422 Unprocessable Entity`
- **Content:**
  ```json
  {
    "success": false,
    "message": "Invalid Parameters"
  }
  ```
- **Description:** The provided `consumption` value is missing or negative, indicating invalid input parameters.

- **Status Code:** `500 Internal Server Error`
- **Content:**
  ```json
  {
    "success": false,
    "message": "Server Error"
  }
  ```
- **Description:** An unexpected server error occurred while processing the request. Check the server logs for details.

##

# How to run

Launch the application utilizing the 'Bash script' found within the 'scripts' directory. To execute this script, follow these two steps:

- Modify the file permissions to make it executable by running
  `chmod +x scripts/start.sh`.
- Execute the script using
  `./start.sh`.

# Commands

- `npm run test:units` Run all unit tests
- `npm run test:integration` Run all integration tests
- `npm run start` Start application server
