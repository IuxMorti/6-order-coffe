const b = document.querySelector(".beverage");
const buttonAdd = document.querySelector(".add-button").parentElement;
const form = document.querySelector("form");
const overlay = document.querySelector(".modal-overlay");

function openCloseModal() {
    overlay.classList.toggle("hide");
}

document
    .querySelector(".add-button")
    .addEventListener("click", () => addBeverage());
document
    .querySelector(".close-overlay")
    .addEventListener("click", () => openCloseModal());

form.addEventListener("submit", (e) => {
    e.preventDefault();
    for (var a of e.target) {
        if (a.tagName === "FIELDSET") {
            console.log(a.children);
        }
    }
    console.log(new FormData(form));
    openCloseModal();
});

class Beverages {
    static BeverageElement = document.querySelector(".beverage");
    static Counter = 1;

    static GetNextBeverageElement() {
        this.Counter += 1;
        const bvg = this.BeverageElement.cloneNode(true);

        bvg.querySelector(
            ".beverage-count"
        ).innerHTML = `Напиток №${this.Counter}`;

        this.configAttribute(bvg);
        addRemoveButton(bvg.querySelector(".delete-beverage-button"), bvg);

        return bvg;
    }

    static configAttribute(element) {
        if (element?.attributes && element?.attributes?.name) {
            element.setAttribute(
                "name",
                element.attributes["name"].value + `-${this.Counter}`
            );
            console.log(element.attributes["name"]);
        }
        for (let child of element.childNodes) {
            this.configAttribute(child);
        }
    }
}

function addBeverage() {
    buttonAdd.insertAdjacentElement(
        "beforebegin",
        Beverages.GetNextBeverageElement()
    );
}

function addRemoveButton(element, elementRemove) {
    element.addEventListener("click", () => elementRemove.remove());
}

function declination(number) {
    if (number % 100 > 10 && number % 100 < 20) return "напитков";
    else if (number % 10 === 1) {
        return "напиток";
    } else if (number % 10 < 1 && number % 10 < 5) {
        return "напитка";
    }
    return "напитков";
}
