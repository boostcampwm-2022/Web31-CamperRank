describe("js test", () => {
  it("number test", () => {
    expect(3 + 4).toBe(7); // 3+4가 7인지 테스트
  });

  it("string test", () => {
    const name = "J4J";

    expect(name).toBe("J4J"); // name이 J4J인지 테스트
  });
});
