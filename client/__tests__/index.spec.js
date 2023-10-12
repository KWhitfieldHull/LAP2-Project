const { renderDOM } = require("./helpers")

let dom;
let document;

describe("index.html", () => {
    beforeEach(async () => {
        dom = await renderDOM("./client/index.html")
        document = await dom.window.document

    })
    it("H1 displays The Florin Recycle Project", () => {
        const h1 = document.querySelector("h1")
        expect(h1.innerHTML).toContain("The Florin Recycle Project")
    })

    it("Has a logo", () => {
        const logo = document.querySelector("logo")
        expect(logo).toBeTruthy
    })
    it("Has a main page button", () => {
        const mainBtn = document.querySelector("mainButton")
        expect(mainBtn).toBeTruthy
    })
    it("Has a recycle button", () => {
        const recycleBtn = document.querySelector("recycleBtn")
        expect(recycleBtn).toBeTruthy
    })
    it("Has an account button", () => {
        const accountBtn = document.querySelector("accountButton")
        expect(accountBtn).toBeTruthy
    })
    it("Has a logout button", () => {
        const logoutBtn = document.querySelector("log-out")
        expect(logoutBtn).toBeTruthy

    })





})