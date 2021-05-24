import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Footer from "..";

const getCurrentYear = () => new Date();

describe("Footer component", () => {
  it("renders", () => {
    render(<Footer currentYear={getCurrentYear} />);
  });

  it("matches snapshot DOM node structure", () => {
    const { asFragment } = render(<Footer currentYear={getCurrentYear} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("inserts name, copyright symbol", () => {
    render(<Footer currentYear={getCurrentYear} />);
    expect(screen.getByText(/Essennejaye ©/)).toBeInTheDocument();
  });

  it("inserts current year", () => {
    render(<Footer />);
    expect(screen.getByTestId("currentYear")).toHaveTextContent(
      `${getCurrentYear().getFullYear()}`
    );
  });

  it("inserts icons", () => {
    render(<Footer currentYear={getCurrentYear} />);
    const githubIconImg = screen.getByAltText("github-icon");
    const linkedinIconImg = screen.getByAltText("linkedin-icon");
    expect(githubIconImg).toBeInTheDocument();
    expect(linkedinIconImg).toBeInTheDocument();
  });
  
  it("renders links", () => {
    render(<Footer currentYear={getCurrentYear} />);
    const githubLink = screen.getByRole("link", { name: "github-icon" });
    const linkedinLink = screen.getByRole("link", { name: "linkedin-icon" });
    expect(githubLink).toHaveAttribute ('href', "https://github.com/essennejaye");
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/satalia-n-jefferson');
  });
});
