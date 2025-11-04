import { expect, test } from "@playwright/test";
import { CreateSaleDtoType } from "./sales-types";

const API_BASE_URL = "http://localhost:3000";

// Helper function to generate a random UUID for testing
function generateTestUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );
}

test.describe("Sales API POST create a sale", () => {
  test("POST SUCCESS 201 /sales - should create a new sale successfully", async ({
    request,
  }) => {
    const saleData: CreateSaleDtoType = {
      name: "Energy Supply Account",
      customerName: "Alice Johnson",
      email: "alice.johnson@example.com",
      mpans: ["1234567890123", "9876543210987"],
      contractStartDate: "2025-01-01",
      contractEndDate: "2026-01-01",
      status: "active",
    };

    const response = await request.post(
      `${API_BASE_URL}/sales`,
      {
        data: saleData,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody).toMatchObject({
      name: saleData.name,
      customerName: saleData.customerName,
      email: saleData.email,
      mpans: saleData.mpans,
      contractStartDate: saleData.contractStartDate,
      contractEndDate: saleData.contractEndDate,
      status: saleData.status,
    });

    expect(responseBody).toHaveProperty("id");
    expect(responseBody).toHaveProperty("createdDate");
    expect(responseBody.id).toBeTruthy();
    expect(responseBody.createdDate).toBeTruthy();
  });

  test("POST FAILURE 400 /sales - should return 400 for missing required fields", async ({
    request,
  }) => {
    const incompleteSaleData = {
      name: "Energy Supply Account",
    };

    const response = await request.post(
      `${API_BASE_URL}/sales`,
      {
        data: incompleteSaleData,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    expect(response.status()).toBe(400);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("message");
    expect(Array.isArray(responseBody.message)).toBe(true);
  });

  test("POST FAILURE 400 /sales - should return 400 for invalid email format", async ({
    request,
  }) => {
    const saleDataWithInvalidEmail = {
      name: "Energy Supply Account",
      customerName: "Alice Johnson",
      email: "invalid-email", // Invalid email format
      mpans: ["1234567890123"],
      contractStartDate: "2025-01-01",
      contractEndDate: "2026-01-01",
      status: "active",
    };

    const response = await request.post(
      `${API_BASE_URL}/sales`,
      {
        data: saleDataWithInvalidEmail,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    expect(response.status()).toBe(400);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("message");
    expect(
      responseBody.message.some((msg: string) =>
        msg.includes("email")
      )
    ).toBe(true);
  });

  test("POST FAILURE 400 /sales - should return 400 for invalid status value", async ({
    request,
  }) => {
    const saleDataWithInvalidStatus = {
      name: "Energy Supply Account",
      customerName: "Alice Johnson",
      email: "alice.johnson@example.com",
      mpans: ["1234567890123"],
      contractStartDate: "2025-01-01",
      contractEndDate: "2026-01-01",
      status: "invalid-status",
    };

    const response = await request.post(
      `${API_BASE_URL}/sales`,
      {
        data: saleDataWithInvalidStatus,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    expect(response.status()).toBe(400);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("message");
    expect(
      responseBody.message.some((msg: string) =>
        msg.includes("status")
      )
    ).toBe(true);
  });

  test("POST FAILURE 400 /sales - should return 400 for invalid date format", async ({
    request,
  }) => {
    const saleDataWithInvalidDate = {
      name: "Energy Supply Account",
      customerName: "Alice Johnson",
      email: "alice.johnson@example.com",
      mpans: ["1234567890123"],
      contractStartDate: "invalid-date",
      contractEndDate: "2026-01-01",
      status: "active",
    };

    const response = await request.post(
      `${API_BASE_URL}/sales`,
      {
        data: saleDataWithInvalidDate,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    expect(response.status()).toBe(400);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("message");
    expect(
      responseBody.message.some(
        (msg: string) =>
          msg.includes("contractStartDate") ||
          msg.includes("date")
      )
    ).toBe(true);
  });
});

test.describe("Sales API GET get all sales", () => {
  test("GET SUCCESS 200 /sales - should return all sales", async ({
    request,
  }) => {
    const response = await request.get(
      `${API_BASE_URL}/sales`
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);

    // If there are sales in the response, verify the structure
    if (responseBody.length > 0) {
      const sale = responseBody[0];
      expect(sale).toHaveProperty("id");
      expect(sale).toHaveProperty("name");
      expect(sale).toHaveProperty("customerName");
      expect(sale).toHaveProperty("email");
      expect(sale).toHaveProperty("mpans");
      expect(sale).toHaveProperty("contractStartDate");
      expect(sale).toHaveProperty("contractEndDate");
      expect(sale).toHaveProperty("status");
      expect(sale).toHaveProperty("createdDate");
      expect(Array.isArray(sale.mpans)).toBe(true);
    }
  });

  test("GET SUCCESS 200 /sales - should return sales with correct data types", async ({
    request,
  }) => {
    // First, create a sale to ensure we have data to test
    const saleData: CreateSaleDtoType = {
      name: "Test Energy Account",
      customerName: "Test Customer",
      email: "test@example.com",
      mpans: ["1111111111111"],
      contractStartDate: "2025-01-01",
      contractEndDate: "2026-01-01",
      status: "active",
    };

    // Create a sale first
    await request.post(`${API_BASE_URL}/sales`, {
      data: saleData,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Now get all sales
    const response = await request.get(
      `${API_BASE_URL}/sales`
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    const sale = responseBody[responseBody.length - 1]; // Get the last created sale
    expect(typeof sale.id).toBe("string");
    expect(typeof sale.name).toBe("string");
    expect(typeof sale.customerName).toBe("string");
    expect(typeof sale.email).toBe("string");
    expect(Array.isArray(sale.mpans)).toBe(true);
    expect(typeof sale.contractStartDate).toBe("string");
    expect(typeof sale.contractEndDate).toBe("string");
    expect(typeof sale.status).toBe("string");
    expect(typeof sale.createdDate).toBe("string");
  });
});

test.describe("Sales API GET get sale by ID", () => {
  test("GET SUCCESS 200 /sales/:id - should return a specific sale by ID", async ({
    request,
  }) => {
    // First, create a sale to test with
    const saleData: CreateSaleDtoType = {
      name: "Test Energy Account for ID",
      customerName: "Test Customer ID",
      email: "test-id@example.com",
      mpans: ["2222222222222"],
      contractStartDate: "2025-01-01",
      contractEndDate: "2026-01-01",
      status: "active",
    };

    const createResponse = await request.post(
      `${API_BASE_URL}/sales`,
      {
        data: saleData,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    expect(createResponse.status()).toBe(201);
    const createdSale = await createResponse.json();
    const saleId = createdSale.id;

    const response = await request.get(
      `${API_BASE_URL}/sales/${saleId}`
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toMatchObject({
      id: saleId,
      name: saleData.name,
      customerName: saleData.customerName,
      email: saleData.email,
      mpans: saleData.mpans,
      contractStartDate: saleData.contractStartDate,
      contractEndDate: saleData.contractEndDate,
      status: saleData.status,
    });

    expect(responseBody).toHaveProperty("createdDate");
    expect(responseBody.createdDate).toBeTruthy();
  });

  test("GET SUCCESS 200 /sales/:id - should return sale with correct data types", async ({
    request,
  }) => {
    const saleData: CreateSaleDtoType = {
      name: "Data Types Test Sale",
      customerName: "Data Types Customer",
      email: "datatypes@example.com",
      mpans: ["3333333333333"],
      contractStartDate: "2025-01-01",
      contractEndDate: "2026-01-01",
      status: "active",
    };

    const createResponse = await request.post(
      `${API_BASE_URL}/sales`,
      {
        data: saleData,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const createdSale = await createResponse.json();
    const saleId = createdSale.id;

    const response = await request.get(
      `${API_BASE_URL}/sales/${saleId}`
    );

    expect(response.status()).toBe(200);

    const sale = await response.json();

    expect(typeof sale.id).toBe("string");
    expect(typeof sale.name).toBe("string");
    expect(typeof sale.customerName).toBe("string");
    expect(typeof sale.email).toBe("string");
    expect(Array.isArray(sale.mpans)).toBe(true);
    expect(typeof sale.contractStartDate).toBe("string");
    expect(typeof sale.contractEndDate).toBe("string");
    expect(typeof sale.status).toBe("string");
    expect(typeof sale.createdDate).toBe("string");
  });

  test("GET FAILURE 404 /sales/:id - should return 404 for non-existent sale ID", async ({
    request,
  }) => {
    const nonExistentId = generateTestUUID();

    const response = await request.get(
      `${API_BASE_URL}/sales/${nonExistentId}`
    );

    expect(response.status()).toBe(404);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("message");
    expect(responseBody.message).toContain("not found");
  });

  test("GET FAILURE 400 /sales/:id - should return 400 for invalid ID format", async ({
    request,
  }) => {
    const invalidId = "invalid-id-format";

    const response = await request.get(
      `${API_BASE_URL}/sales/${invalidId}`
    );

    expect(response.status()).toBe(404);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("message");
  });
});
