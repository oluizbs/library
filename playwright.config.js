module.exports = {
    testDir: './testes',
    timeout: 90000,      // Tempo limite para os testes
    retries: 2,          // Número de tentativas em caso de falha
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 0,
        ignoreHTTPSErrors: true,
      },
  };