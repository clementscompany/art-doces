import CardPerfil from "../Components/CardPerfil.js";
import ChoicePopUp from "../Components/ChoicePopUp.js";
import MiniSpinner from "../Components/MiniSpinner.js";

class Settings {
  constructor(mainContainer) {
    this.main = mainContainer;
    this.card = document.createElement("div");
    this.Profil(mainContainer);
    this.SetTheme(mainContainer);
    this.ChangeTheme();
    this.LogOutFunction(this.main);
  }

  Profil(mainContainer) {
    this.open = mainContainer.querySelector("#openPerfil");
    this.open.addEventListener("click", () => {
      this.card.innerHTML = CardPerfil();
      mainContainer.appendChild(this.card);
      this.closeCardOnClickOutside = (e) => {
        if (e.target.id === "component") {
          mainContainer.removeChild(this.card);
          window.removeEventListener("click", this.closeCardOnClickOutside);
        }
      };
      window.addEventListener("click", this.closeCardOnClickOutside);
      this.closeCardButton = this.card.querySelector("#closeCardButton");
      this.closeCardButton.addEventListener("click", () => {
        mainContainer.removeChild(this.card);
        window.removeEventListener("click", this.closeCardOnClickOutside);
      });
      this.LogOutFunction(mainContainer);
    });
  }

  LogOutFunction(mainContainer) {
    //log out Functions 
    this.logoutButton = mainContainer.querySelectorAll("#logOutButton");
    this.logoutButton.forEach(button => {
      button.addEventListener("click", () => {
        this.card.classList.add("modalContainer");
        this.card.innerHTML = ChoicePopUp("Tem certeza que deseja terminar a sessão?", "error");
        mainContainer.appendChild(this.card);

        this.choiceButtons = mainContainer.querySelectorAll("#choiceButtons > button");
        this.choiceButtons.forEach((button, index) => {
          button.addEventListener("click", () => {
            switch (index) {
              case 0:
                this.card.innerHTML = MiniSpinner();
                sessionStorage.removeItem("session_token");
                setTimeout(() => {
                  // window.location.reload();
                  window.close();
                }, 300);
                break;
              default:
                mainContainer.removeChild(this.card);
                break;
            }
          });
        });
      });
    });
  }

  //theme settings 
  SetTheme(mainContainer) {
    this.themeButton = mainContainer.querySelector("#themeButton");
    this.themeButton.addEventListener("click", () => {
      this.oldTheme = localStorage.getItem("theme-system") || "dark";
      this.newTheme = this.oldTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme-system", this.newTheme);
      this.ChangeTheme();
    });
  }

  ChangeTheme() {
    this.theme = localStorage.getItem("theme-system") || "dark";
    document.documentElement.setAttribute("theme-system", this.theme);
  }
}

export default Settings;
