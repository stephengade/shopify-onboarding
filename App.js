const websiteAlert = document.querySelector("#showAlert");
const closeAlert = document.querySelector("#closeAlert");
const toggleGuide = document.querySelector(".toggleGuide");
const openGuideIcon = document.querySelector(".openDropdownIcon");
const closeGuideIcon = document.querySelector(".closeDropdownIcon");
const onboardingBody = document.querySelector(".onboarding__body");

const panelStateIndicator = document.querySelectorAll(".panel__indicator");

const progressNumber = document.querySelector(".progress__number");

const accordionItems = document.querySelectorAll(".panel");
const progressBar = document.querySelector(".progress__bar");


const NotificationIcon = document.querySelector(".notification__icon")
 
const NotificationModal = document.querySelector(".notification__alert")

const ProfileMenu = document.querySelector(".profile__dropdown")
const ProfileMenuTrigger = document.querySelector(".nav__username__and__avater")


// onboarding icons

const OnboardingIcons = {
 completed: `
 <svg class="cursor" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#303030"></circle>
    <path
      d="M17.2738 8.52629C17.6643 8.91682 17.6643 9.54998 17.2738 9.94051L11.4405 15.7738C11.05 16.1644 10.4168 16.1644 10.0263 15.7738L7.3596 13.1072C6.96908 12.7166 6.96908 12.0835 7.3596 11.693C7.75013 11.3024 8.38329 11.3024 8.77382 11.693L10.7334 13.6525L15.8596 8.52629C16.2501 8.13577 16.8833 8.13577 17.2738 8.52629Z"
      fill="#fff"
    ></path>
  </svg>
 `,

//  loading

loading: `
<svg class="spin cursor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28" fill="none">
    <path
      d="M26 14C26 16.3734 25.2962 18.6935 23.9776 20.6668C22.6591 22.6402 20.7849 24.1783 18.5922 25.0866C16.3995 25.9948 13.9867 26.2324 11.6589 25.7694C9.33114 25.3064 7.19295 24.1635 5.51472 22.4853C3.83649 20.8071 2.6936 18.6689 2.23058 16.3411C1.76755 14.0133 2.00519 11.6005 2.91345 9.4078C3.8217 7.21509 5.35977 5.34094 7.33316 4.02236C9.30655 2.70379 11.6266 2 14 2"
      stroke="#000"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`,

// default

default: `
<svg class="panel__radio cursor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#8A8A8A" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 5"/>
                        </svg>
`

}




const toggleElementDisplay = (element, otherElement) => {
  const isOtherElementActive = otherElement.style.display.includes("flex");
  if (isOtherElementActive) {
    otherElement.style.display = "none";
    otherElement.attributes["aria-expanded"] = "false";
  }

  const isElementActive = element.style.display.includes("flex");
  const menuItems = element.querySelectorAll("li");
  let focusedIndex = 0;

  if (isElementActive) {
    element.style.display = "none";
    element.attributes["aria-expanded"] = "false";
    menuItems.forEach((item) => {
      item.tabIndex = -1;
    });
  } else {
    element.style.display = "inline-flex";
    element.attributes["aria-expanded"] = "true";
    menuItems.forEach((item) => {
      item.tabIndex = item.getAttribute("data-index");
    });

    menuItems[0].focus();

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        if (focusedIndex < menuItems.length - 1) {
          focusedIndex++;
        }
        menuItems[focusedIndex].focus();

      } else if (event.key === "ArrowUp") {
        if (focusedIndex > 0) {
          focusedIndex--;
        }
        menuItems[focusedIndex].focus();
      } else if (event.key === "Escape" && element.style.display !== "none") {
        element.style.display = "none"
      }
    });

    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        window.open("https://admin.shopify.com", "_blank");
      });

      item.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          window.open("https://admin.shopify.com", "_blank");
        }
      });
    });
  }
};

// Notification
NotificationIcon.addEventListener("click", () => {
  toggleElementDisplay(NotificationModal, ProfileMenu);
});


// profile menu

ProfileMenuTrigger.addEventListener("click", () => {
  toggleElementDisplay(ProfileMenu, NotificationModal);
});





// progressBar
let completedCount = 0;
let loading = false;

// simulate step completion

// accordion

Array.from(accordionItems).forEach((item, index) => {
  const panelTitle = item.getElementsByClassName("panel__title")[0];
  const panelContent = item.getElementsByClassName("panel__content")[0];
  const panelButton = item.getElementsByClassName("panel__indicator")[0];

  const totalItems = item.length;

  panelButton.addEventListener("click", () => {
    if (loading) return;


    // simulating API call with setTimeout

    loading = true;
    panelButton.innerHTML = OnboardingIcons.loading;

    setTimeout(() => {
      loading = false;

      // Update progress and button based on completion status
      if (panelButton.classList.contains("completed")) {
        completedCount--;
        progressNumber.innerText = completedCount;
        progressBar.value = completedCount;
        panelButton.classList.remove("completed");
        panelButton.innerHTML = OnboardingIcons.default;
      } else {
        completedCount++;
        progressNumber.innerText = completedCount;
        progressBar.value = completedCount;
        panelButton.classList.add("completed");
        panelButton.innerHTML = OnboardingIcons.completed;
      }

      // Open the next panel if not the last and not all are completed
      if (
        index + 1 < accordionItems.length &&
        completedCount !== accordionItems.length
      ) {
        const nextPanelTitle =
          accordionItems[index + 1].querySelector(".panel__title");
        nextPanelTitle.click();
        nextPanelTitle.click(); // Double click to ensure it opens
      }

      // Close all panels if all are completed
      if (completedCount === accordionItems.length) {
        Array.from(accordionItems).forEach((item) => {
          const panelContent = item.getElementsByClassName("panel__content")[0];
          panelContent.style.display = "none";
          panelContent.classList.remove("active");
          item.classList.remove("panel__background");
        });
      }
    }, 1000);
  });

  // close and open panels
  panelContent.style.transition = "opacity 5s ease-in-out";

  panelTitle.addEventListener("click", () => {
    if (panelContent.classList.contains("active")) return;

    // Close all open panels
    const openPanels = document.querySelectorAll(".panel__content.active");
    Array.from(openPanels).forEach((panel) => {
      panel.style.display = "none";
      panel.classList.remove("active");
      panel.parentElement.classList.remove("panel__background");
    });

    // Open the clicked panel
    panelContent.classList.add("active");
    panelContent.style.display = "flex";
    panelContent.style.gap = "96px";
    item.classList.add("panel__background");
  });
});

// close alert

closeAlert.addEventListener("click", () => {
  websiteAlert.style.display = "none";
  websiteAlert.attributes["aria-expanded"] = "false"
});

// open or close guide.

const handleToggleGuide = () => {
  const isGuideOpen = openGuideIcon.style.display !== "none";

  toggleGuide.attributes["aria-expanded"] = isGuideOpen ? "true" : "false";

  closeGuideIcon.style.display = isGuideOpen ? "block" : "none";
  openGuideIcon.style.display = isGuideOpen ? "none" : "block";
  onboardingBody.style.display = isGuideOpen ? "none" : "block";
};

toggleGuide.addEventListener("click", handleToggleGuide);

toggleGuide.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    handleToggleGuide();
  }
});




