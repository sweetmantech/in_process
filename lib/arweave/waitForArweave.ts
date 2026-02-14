const waitForArweave = async (txId: string) => {
  while (true) {
    const res = await fetch(`https://arweave.net/tx/${txId}/status`, {
      cache: "no-store",
    });
    if (res.status === 202) return;
    await new Promise((r) => setTimeout(r, 2_000));
  }
};

export default waitForArweave;
