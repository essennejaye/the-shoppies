import { movieFetch } from "..";

describe("testing movieFetch", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("calls omdb and returns data", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        Search: [
          { imdbID: "1", Title: "Star trek", Year: "1990", Poster: "none" },
        ],
      })
    );
    const res = await movieFetch();
    expect(res).toEqual([
      {
        imdbID: "1",
        Title: "Star trek",
        Year: "1990",
        Poster: "none",
      },
    ]);
    expect(fetch.mock.calls.length).toBe(1);
  });

  it("calls omdb and returns error when no results are found", async () => {
    fetch.mockResponseOnce(JSON.stringify([]) 
    );
    const res = await movieFetch('');
    expect(res).toEqual(
      `We're sorry.\nThere were no selections found with that search term!\nPlease try again.`
    );
    expect(fetch.mock.calls.length).toBe(1);
  });

  it("returns server error when exception", async () => {
    fetch.mockImplementationOnce(() => Promise.reject());
    let errorMessage = `Internal server error.\n Please try again!`
    expect(errorMessage).toEqual(
      `Internal server error.\n Please try again!`
    );
    expect(fetch.mock.calls.length).toBe(0);
  });
});
