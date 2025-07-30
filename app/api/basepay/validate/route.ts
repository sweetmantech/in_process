export async function POST(request: Request) {
  const requestData = await request.json();

  try {
    const { requestedInfo } = requestData.capabilities.dataCallback;
    const errors: {
      email?: string;
      physicalAddress?: {
        postalCode?: string;
      };
    } = {};

    // Validate email
    if (requestedInfo.email && requestedInfo.email.endsWith("@example.com")) {
      errors.email = "Example.com emails are not allowed";
    }

    // Validate physical address
    if (requestedInfo.physicalAddress) {
      const addr = requestedInfo.physicalAddress.physicalAddress;
      if (addr.postalCode && addr.postalCode.length < 5) {
        if (!errors.physicalAddress) errors.physicalAddress = {};
        errors.physicalAddress.postalCode = "Invalid postal code";
      }
    }

    // Return errors if any found
    if (Object.keys(errors).length > 0) {
      return Response.json({ errors });
    }

    // Success - return original calls
    return Response.json({
      calls: requestData.calls,
      chainId: requestData.chainId,
      version: requestData.version,
      capabilities: requestData.capabilities,
    });
  } catch (error) {
    console.error("Error validating data:", error);
    return Response.json({
      errors: { server: "Server error validating data" },
    });
  }
}
