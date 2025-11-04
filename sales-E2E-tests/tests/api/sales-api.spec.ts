import { expect, test } from "@playwright/test";
import { CreateSaleDtoType } from "./sales-types";

const API_BASE_URL = "http://localhost:3000";

test.describe("Sales API", () => {
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
