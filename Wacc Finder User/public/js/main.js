/**
 * Mobile Navigation
 */

(function mobileFooter(i18n) {
  var i18n = i18n ? i18n : { current: "current" },
    navs = document.querySelectorAll("nav.mobile-footer");
  [].forEach.call(navs, function (nav, index) {
    var a = 0,
      c = 0,
      i = 1, // active, current, increment
      links = nav.getElementsByTagName("a"),
      line = nav.querySelector(".line");
    if (!line) {
      line = document.createElement("i");
      line.setAttribute("aria-hidden", true);
      line.className = "line";
      line.innerHTML = i18n.current;
      nav.appendChild(line);
    }
    line.id = "nav-current" + index;
    if (!line.innerHTML.length) line.innerHTML = i18n.current;
    [].forEach.call(links, function (link, index) {
      link.removeAttribute("aria-describedby");
      if (link.className.match(/\bactive\b/g)) place(line, link);
      link.addEventListener("click", function (e) {
        a = index;
        var t = setInterval(function () {
          links[c].classList.remove("traversing");
          links[c].classList.remove("active");
          if (a > c) i = 1;
          else if (a < c) i = -1;
          c += i;
          links[c].classList.add("traversing");
          if (c != -1) {
            links[c - i].classList.remove("active");
          }
          if (c == a) {
            e.target.classList.remove("traversing");
            e.target.classList.add("active");
            i = 0;
            clearInterval(t);
          }
        }, 100); // Traversing hilite: min: 100ms
        place(line, e.target);
      });
    });
  });
  function place(l, a) {
    a.setAttribute("aria-describedby", l.id || "nav-current");
    l.style.width = a.offsetWidth + "px";
    l.style.left = a.offsetLeft + a.offsetWidth / 2 + "px";
  }
})();

/**
 * Sticky Header
 */
// Check if the element with ID 'main_header' exists before adding scroll event listener
if (document.getElementById("main_header")) {
  window.addEventListener("scroll", function () {
    var header = document.getElementById("main_header");
    var scrollPosition = window.scrollY;

    // Add or remove 'fixed' class based on scroll position
    if (scrollPosition > 1) {
      // Example threshold, adjust as needed
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
}

// Function to get user initials
function getUserInitials(name) {
  var initials = name.match(/\b\w/g) || [];
  initials = ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  return initials;
}

// Function to validate email address format
function isValidEmail(email) {
  var emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
}

$(document).ready(function () {
  /**
   * Login Page Script
   */
  if ($("#login").length > 0) {
    // Function to validate email using regex
    function validateEmail(email) {
      var re =
        /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    // Function to add error display
    function addError(element, message) {
      element.addClass("error-input");
      element.next(".error-message").remove(); // Remove existing message to prevent duplicates
      var errorMessage = $('<div class="error-message">' + message + "</div>");
      element.after(errorMessage);
    }

    // Function to remove error display
    function removeError(element) {
      element.removeClass("error-input");
      element.next(".error-message").remove();
    }

    // Attach click event handler to the button
    $("#signin").click(function (e) {
      e.preventDefault(); // Prevent default form submission

      // Clear any previous error states and messages
      $(".error-input").removeClass("error-input");
      $(".error-message").remove();

      // Get input values
      var email = $('input[name="email"]').val().trim();
      var password = $('input[name="password"]').val().trim();

      var isValid = true;

      // Validate Email
      if (email.length === 0) {
        addError($('input[name="email"]'), "Please enter an email address.");
        isValid = false;
      } else if (!validateEmail(email)) {
        addError(
          $('input[name="email"]'),
          "Please enter a valid email address."
        );
        isValid = false;
      }

      // Validate Password
      if (password.length < 8) {
        addError(
          $('input[name="password"]'),
          "Your password must be at least 8 characters long."
        );
        isValid = false;
      }

      // If all validations pass, submit the form
      if (isValid) {
        this.submit();
        // Perform form submission
        // For example:
        // $('#loginForm').submit();
      }
    });
  }

  /**
   * Security Page Script
   */
  if ($("#security").length > 0) {
    $("form").submit(function (e) {
      e.preventDefault(); // Prevent default form submission

      // Clear any previous error states and messages
      $(".error-input").removeClass("error-input");
      $(".error-message").remove();

      // Get form inputs
      var currentPassword = $('input[name="current_password"]').val().trim();
      var newPassword = $('input[name="password"]').val().trim();
      var confirmPassword = $('input[name="password_confirmation"]')
        .val()
        .trim();

      var isValid = true;

      // Validate Current Password
      if (currentPassword.length === 0) {
        addError(
          $('input[name="current_password"]'),
          "Please enter your current password."
        );
        isValid = false;
      }

      // Validate New Password
      if (newPassword.length < 8) {
        addError(
          $('input[name="password"]'),
          "Your new password must be at least 8 characters long."
        );
        isValid = false;
      }

      // Validate Password Confirmation
      if (confirmPassword !== newPassword) {
        addError(
          $('input[name="password_confirmation"]'),
          "Passwords do not match."
        );
        isValid = false;
      }

      // If all validations pass, submit the form
      if (isValid) {
        this.submit();
      }
    });

    // Function to add error display
    function addError(element, message) {
      element.addClass("error-input");
      var errorMessage = $('<div class="error-message">' + message + "</div>");
      element.after(errorMessage);
    }
  }

  /**
   * Business Info Page Script
   */
  if ($("#business-information").length > 0) {
    $("#business-info-form").validate({
      rules: {
        bussiness_name: {
          required: true,
        },
        organization_type: {
          required: true,
        },
        bussiness_type: {
          required: true,
        },
        no_employment: {
          required: true,
        },
        bussiness_industry: {
          required: true,
        },
      },
      messages: {
        bussiness_name: {
          required: "Please enter your business name",
        },
        organization_type: {
          required: "Please select an organization type",
        },
        bussiness_type: {
          required: "Please select a business stage",
        },
        no_employment: {
          required: "Please select the number of employees",
        },
        bussiness_industry: {
          required: "Please select a business industry",
        },
      },
      submitHandler: function (form) {
        form.submit();
      },
    });
  }

  /**
   * Custom Avatar Creation
   */
  if ($("#account")) {
    // Get user's full name from the element with class "full-name"
    var fullName = $(".full-name").text();

    // Get user initials
    var initials = getUserInitials(fullName);

    // Create image element with initials as text
    var img = $('<div class="pp"></div>').text(initials);

    // Append image to the div with id "avatar"
    $("#pp").append(img);
  }

  /**
   * Show/Hide Password
   */
  if ($(".inpt-pass")) {
    $(".sh").click(function () {
      var $input = $(this).prev("input");
      var $form_group = $(this).closest(".form-group.inpt-pass");
      if ($input.attr("type") === "password") {
        $input.attr("type", "text");
        $(this).text("Hide");
        $form_group.addClass("show");
      } else {
        $input.attr("type", "password");
        $(this).text("Show");
        $form_group.removeClass("show");
      }
    });
  }

  /**
   * Phone Number Input
   */
  if ($("#phone").length > 0) {
    var input = document.querySelector("#phone");
    var iti = window.intlTelInput(input, {
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@16.0.3/build/js/utils.js",
      separateDialCode: true,
      showSelectedDialCode: true,
      allowDropdown: true,
      showFlags: false,
    });

    // store the instance variable so we can access it in the console e.g. window.iti.getNumber()
    window.iti = iti;
  }

  /**
   * Profile Form Validation
   */
  if ($("#profile-form").length > 0) {
    $("#profile-form").submit(function (e) {
      e.preventDefault(); // Prevent default form submission

      // Clear any previous error states and messages
      $(".error-message").text("");
      $(".form-control").removeClass("error-input");

      // Get form inputs
      var name = $("#name").val().trim();
      var occupation = $("#occupation").val().trim();
      var phone = $("#phone-num").val().trim();
      var email = $("#email").val().trim();

      var isValid = true;

      // Validate Name
      if (name === "") {
        $("#name").addClass("error-input");
        $("#name-error").text("Please enter your name.");
        isValid = false;
      }

      // Validate Occupation
      if (occupation === "") {
        $("#occupation").addClass("error-input");
        $("#occupation-error").text("Please select your occupation.");
        isValid = false;
      }

      // Validate Phone Number
      if (phone === "") {
        $("#phone-num").addClass("error-input");
        $("#phone-error").text("Please enter your phone number.");
        isValid = false;
      }

      // Validate Email Address
      if (email === "") {
        $("#email").addClass("error-input");
        $("#email-error").text("Please enter your email address.");
        isValid = false;
      } else if (!isValidEmail(email)) {
        $("#email").addClass("error-input");
        $("#email-error").text("Please enter a valid email address.");
        isValid = false;
      }

      // If all validations pass, submit the form
      if (isValid) {
        this.submit();
      }
    });
  }

  /**
   * Rename Form Validation
   */
  if ($("#rename_form").length > 0) {
    $("#rename_form").submit(function (e) {
      e.preventDefault(); // Prevent default form submission

      // Clear any previous error states and messages
      $(".error-message").text("");
      $(".form-control").removeClass("error-input");

      // Get form inputs
      var rename = $("#wacc_name").val().trim();

      var isValid = true;

      // Validate Name
      if (rename === "") {
        $("#wacc_name").addClass("error-input");
        $("#rename-error").text("Please enter your name.");
        isValid = false;
      }

      // If all validations pass, submit the form
      if (isValid) {
        this.submit();
      }
    });
  }

  /**
   * Register Form Validation
   */
  if ($("#register_form").length > 0) {
    $("#register_form").submit(function (e) {
      e.preventDefault(); // Prevent default form submission

      // Clear any previous error states and messages
      $(".error-message").text("");
      $(".form-control").removeClass("error-input");

      // Get form inputs
      var fname = $("#fname").val().trim();
      var email = $("#register-email").val().trim();
      var phone = $("#phone-num").val().trim();
      var occupation = $("#register-occupation").val().trim();
      var password = $('input[name="password"]').val().trim();
      var agreementChecked = $("#agreementCheck").is(":checked");

      var isValid = true;

      // Validate Name
      if (fname === "") {
        $("#fname").addClass("error-input");
        $("#fname-error").text("Please enter your name.");
        isValid = false;
      }

      // Validate Occupation
      if (occupation === "") {
        $("#register-occupation").addClass("error-input");
        $("#occupation-error").text("Please select your occupation.");
        isValid = false;
      }

      // Validate Phone Number
      if (phone === "") {
        $("#phone-num").addClass("error-input");
        $("#phone-error").text("Please enter your phone number.");
        isValid = false;
      }

      // Validate Password
      if (password.length === 0) {
        addError($('input[name="password"]'), "Please enter a password.");
        isValid = false;
      }

      // Validate Email Address
      if (email === "") {
        $("#register-email").addClass("error-input");
        $("#email-error").text("Please enter your email address.");
        isValid = false;
      } else if (!isValidEmail(email)) {
        $("#register-email").addClass("error-input");
        $("#email-error").text("Please enter a valid email address.");
        isValid = false;
      }

      // Validate Agreement Checkbox
      if (!agreementChecked) {
        $("#agreement-error").text("You must agree to the terms.");
        isValid = false;
      }

      // If all validations pass, submit the form
      if (isValid) {
        this.submit();
      }
    });
  }

  /**
   * Custom Dropdown Validation
   */
  if ($(".select-dropdown").length > 0) {
    $(".select-dropdown__input").on("click", function (e) {
      e.preventDefault();
      $(".select-dropdown__list").toggleClass("active");
    });

    $(".select-dropdown__list-item").on("click", function () {
      var itemValue = $(this).data("value");
      console.log(itemValue);
      $("#selected-code").val(itemValue);
      $(".select-dropdown__list").toggleClass("active");
    });
  }

  /**
   * Multistep Form / Free User
   */
  if ($(".calculator__action.freeUser").length > 0) {
    $(".rumus__item .circle .value").hide();

    $("#country, #pre_tax, #percent_debt").on("change", function () {
      $(".cost_of_equity").addClass("highlight");
    });

    function populateHiddenFields() {
      $("#hidden_duration").val(formData.duration);
      $("#hidden_month").val(formData.valuationDate.month);
      $("#hidden_year").val(formData.valuationDate.year);
    }

    function updateCalculations() {
      var $currentTab = $(".tab-pane.active");
      var currentTabId = $currentTab.attr("id");

      // Calculation for #calc6
      if (currentTabId === "calc6") {
        // Inside #calc6 calculation
        var countryValue = parseFloat(formData.country.replace("%", "")) / 100; // Convert to decimal
        var currencyValue =
          parseFloat(formData.currency.replace("%", "")) / 100; // Convert to decimal, if it's a percentage
        var industryValue = parseFloat(formData.industry); // Convert to decimal
        var costOfEquity = (currencyValue + industryValue * countryValue) * 100; // Result back to percentage for display
        // Apply custom rounding
        costOfEquity = custom_calc(costOfEquity);
        costOfEquity = costOfEquity.endsWith(".0")
          ? costOfEquity.slice(0, -2)
          : costOfEquity; // Remove trailing ".0"
        $(".span-cost_of_equity")
          .text(costOfEquity + "%")
          .parent()
          .show();
        $("#hidden_costOfEquity").val(costOfEquity);
      }

      // Calculation for #calc8
      if (currentTabId === "calc8") {
        // Inside #calc8 calculation
        var preTaxValue = parseFloat(formData.preTaxCostOfDebt) / 100; // Convert to decimal
        var taxValue = parseFloat(formData.corporateTaxRate) / 100; // Convert to decimal
        var costOfDebt = preTaxValue * (1 - taxValue) * 100; // Convert result back to percentage

        console.log(costOfDebt);
        // Apply custom rounding
        costOfDebt = custom_calc(costOfDebt);
        console.log(costOfDebt);

        costOfDebt = costOfDebt.endsWith(".0")
          ? costOfDebt.slice(0, -2)
          : costOfDebt; // Remove trailing ".0"
        $(".span-cost_of_debt")
          .text(costOfDebt + "%")
          .parent()
          .show();
        $("#hidden_costOfDebt").val(costOfDebt);
      }

      // Setting values for #calc9
      if (currentTabId === "calc9") {
        // Inside #calc9 setting values or right before the WACC calculation
        var spanCostOfEquity = parseFloat($(".span-cost_of_equity").text()); // Retrieve and parse to float
        var spanCostOfDebt = parseFloat($(".span-cost_of_debt").text()); // Retrieve and parse to float

        // Inside #calc9 setting values
        var percentDebt = parseFloat(formData.debtPercentage); // Already a percentage, no need to divide by 100 for display

        // Apply custom rounding to displayed percentages
        var rounded_percentDebt = custom_calc(percentDebt);
        var rounded_percentEquity = custom_calc(100 - percentDebt);
        rounded_percentDebt = rounded_percentDebt.endsWith(".0")
          ? rounded_percentDebt.slice(0, -2)
          : rounded_percentDebt; // Remove trailing ".0"
        rounded_percentEquity = rounded_percentEquity.endsWith(".0")
          ? rounded_percentEquity.slice(0, -2)
          : rounded_percentEquity; // Remove trailing ".0"
        $(".span-percentage_debt")
          .text(rounded_percentDebt + "%")
          .parent()
          .show();
        $(".span-percentage_equity")
          .text(rounded_percentEquity + "%")
          .parent()
          .show();
        $("#hidden_percentDebt").val(rounded_percentDebt);
        $("#hidden_percentEquity").val(rounded_percentEquity);

        // When using percentDebt in calculations, convert to decimal
        var spanPercentageDebt = percentDebt / 100; // Convert to decimal for calculation
        var spanPercentageEquity = (100 - percentDebt) / 100; // Convert to decimal for calculation

        var wacc =
          spanCostOfEquity * spanPercentageEquity +
          spanCostOfDebt * spanPercentageDebt; // Result is a percentage
        // Apply custom rounding to WACC result
        wacc = custom_calc(wacc);
        $(".span-wacc_total")
          .text(wacc + "%")
          .parent()
          .show();
        $(".result")
          .text(wacc + "%")
          .parent()
          .show();
        $("#hidden_wacc").val(wacc);

        //Final Values
        populateHiddenFields();
      }
    }

    function custom_calc(val) {
      var val = parseFloat(val).toFixed(2);
      var str = val.toString();
      var srch = str.indexOf(".");
      if (srch > 0) {
        var splt = str.split(".");
        if (parseFloat(splt[1]) >= 75) {
          return `${Math.ceil(val)}`;
        } else if (parseFloat(splt[1]) >= 50 && parseFloat(splt[1]) <= 75) {
          return `${splt[0]}.5`;
        } else if (parseFloat(splt[1]) >= 25 && parseFloat(splt[1]) <= 50) {
          return `${splt[0]}.5`;
        } else {
          return `${splt[0]}.0`;
        }
      } else {
        return val.toString();
      }
    }

    var formData = {
      duration: null,
      valuationDate: {
        month: null,
        year: null,
      },
      country: null,
      currency: null,
      industry: null,
      preTaxCostOfDebt: null,
      corporateTaxRate: null,
      debtPercentage: null,
      // Add more fields as necessary
    };

    function updateNavigationButtons() {
      const totalTabs = $(".calculator__action .nav-item").length;
      const activeTabIndex =
        $(".calculator__action .nav-item .nav-link.active").parent().index() +
        1; // Index is 0-based

      // Enable/disable prevtab button
      if (activeTabIndex === 1) {
        $(".prevtab").addClass("disabled");
      } else {
        $(".prevtab").removeClass("disabled");
      }

      // Enable/disable nexttab button
      if (activeTabIndex === totalTabs) {
        $(".nexttab").addClass("disabled");
      } else {
        $(".nexttab").removeClass("disabled");
      }

      // Update progress bar
      updateProgressBar(activeTabIndex, totalTabs);
    }

    function updateProgressBar(currentTabIndex, totalTabs) {
      var progressPercentage = (currentTabIndex / totalTabs) * 100;
      $(".progress-bar").css("width", progressPercentage + "%");
    }

    function captureFormData() {
      var $currentTab = $(".tab-pane.active");
      var currentTabId = $currentTab.attr("id");

      switch (currentTabId) {
        case "calc1":
          formData.duration = $("#duration").val();
          break;
        case "calc2":
          formData.valuationDate.month = $("#month").val();
          formData.valuationDate.year = $("#year").val();
          break;
        case "calc3":
          formData.country = $("#country").val();
          break;
        case "calc4":
          formData.currency = $("#currency").val();
          break;
        case "calc5":
          formData.industry = $("#industri").val();
          break;
        case "calc6":
          formData.preTaxCostOfDebt = $("#pre_tax").val();
          break;
        case "calc7":
          formData.corporateTaxRate = $("#tax").val();
          break;
        case "calc8":
          formData.debtPercentage = $("#percent_debt").val();
          break;
        // Add cases for additional steps
        default:
          break;
      }

      console.log("Capturing data for tab: ", currentTabId);
      console.log("Captured Data: ", formData);
    }

    // Initialize the jQuery Validation Plugin on the form
    $("#frm_calc").validate({
      // Validation rules,
      rules: {
        duration: {
          required: true,
        },
        month: {
          required: true,
        },
        year: {
          required: true,
        },
        country: {
          required: true,
        },
        currency: {
          required: true,
        },
        industri: {
          required: true,
        },
        pre_tax: {
          required: true,
        },
        tax: {
          required: true,
        },
        percent_debt: {
          required: true,
        },
      },
      messages: {
        duration: {
          required: "Please select a Duration",
        },
        month: {
          required: "Please select a Month",
        },
        year: {
          required: "Please select a Year",
        },
        country: {
          required: "Please select a Country",
        },
        currency: {
          required: "Please select a Currency",
        },
        industri: {
          required: "Please select an Industry",
        },
        pre_tax: {
          required: "Please enter a value",
        },
        tax: {
          required: "Please enter a value",
        },
        percent_debt: {
          required: "Please enter a value",
        },
      },
    });
    // Function to check if current tab's inputs are valid
    function validateCurrentTab() {
      var isValid = true;
      var $currentTab = $(".tab-pane.active");
      // Validate only the inputs in the current tab
      $currentTab.find(":input").each(function () {
        if (!$(this).valid()) {
          isValid = false;
          return false; // Exit the loop
        }
      });
      return isValid;
    }

    $(".form-action .btn, .nexttab").click(function (e) {
      // Prevent form submission
      e.preventDefault();
      // Check if the current tab is valid
      if (validateCurrentTab()) {
        // Find current and next tab panels
        var $currentTabPanel = $(this).closest(".tab-pane");
        var $nextTabPanel = $currentTabPanel.next(".tab-pane");

        captureFormData();

        if ($nextTabPanel.length) {
          // Activate next tab
          var nextTabId = $nextTabPanel.attr("id");
          $('[href="#' + nextTabId + '"]').tab("show");
          // Introduce a delay before updating calculations.
          setTimeout(function () {
            updateCalculations();
          }, 100); // 100 milliseconds delay.
        }
        updateNavigationButtons();
      }
    });

    $(".nexttab").on("click", function (e) {
      // Prevent default action
      e.preventDefault();

      var activeTabPanel = $(".tab-pane.active");
      // Temporarily setting all inputs in inactive tabs to be ignored by the validator
      var $inactiveInputs = $("#frm_calc .tab-pane")
        .not(".active")
        .find(":input")
        .addClass("ignore-validation");

      if ($("#frm_calc").valid()) {
        // Validate the entire form, but with ignored inputs on inactive tabs
        var nextTabPanel = activeTabPanel.next(".tab-pane");
        if (nextTabPanel.length && !$(this).hasClass("disabled")) {
          var nextTabId = nextTabPanel.attr("id");
          $('[href="#' + nextTabId + '"]').tab("show");
          updateNavigationButtons();
        }
      }

      // Revert ignoring inputs in inactive tabs
      $inactiveInputs.removeClass("ignore-validation");
      // Update validation for current tab
      $("#frm_calc").validate().element(".tab-pane.active :input");
    });

    $(".prevtab").click(function () {
      var $currentTabPanel = $(".tab-pane.active");
      var $prevTabPanel = $currentTabPanel.prev(".tab-pane");
      if ($prevTabPanel.length) {
        // Activate previous tab
        var prevTabId = $prevTabPanel.attr("id");
        $('[href="#' + prevTabId + '"]').tab("show");
        updateNavigationButtons();
      }
    });

    updateNavigationButtons();
  }

  /**
   * Multistep Form / Premium User
   */
  if ($(".calculator__action.premiumUser").length > 0) {
    $(".rumus__item .circle .value").hide();

    $("#country, #pre_tax, #percent_debt").on("change", function () {
      $(".cost_of_equity").addClass("highlight");
    });

    function populateHiddenFields() {
      $("#hidden_duration").val(formData.duration);
      $("#hidden_month").val(formData.valuationDate.month);
      $("#hidden_year").val(formData.valuationDate.year);
    }

    function updateCalculations() {
      var $currentTab = $(".tab-pane.active");
      var currentTabId = $currentTab.attr("id");

      // Calculation for #calc6
      if (currentTabId === "calc7") {
        // Inside #calc7 calculation
        var countryValue = parseFloat(formData.country.replace("%", "")) / 100; // Convert to decimal
        var smallValue = parseFloat(formData.small.replace("%", "")) / 100; // Convert to decimal
        var countryRiskPremiumValue =
          parseFloat(formData.countryRiskPremium.replace("%", "")) / 100; // Convert to decimal
        var currencyValue =
          parseFloat(formData.currency.replace("%", "")) / 100; // Convert to decimal, if it's a percentage
        var industryValue = parseFloat(formData.industry); // Convert to decimal

        var costOfEquity =
          (currencyValue +
            industryValue * countryValue +
            smallValue +
            countryRiskPremiumValue) *
          100; // Result back to percentage for display
        // Apply custom rounding
        costOfEquity = custom_calc(costOfEquity);
        costOfEquity = costOfEquity.endsWith(".0")
          ? costOfEquity.slice(0, -2)
          : costOfEquity; // Remove trailing ".0"

        $(".span-cost_of_equity")
          .text(costOfEquity + "%")
          .parent()
          .show();

        $("#hidden_costOfEquity").val(costOfEquity);
      }

      // Calculation for #calc9
      if (currentTabId === "calc9") {
        // Inside #calc8 calculation
        var preTaxValue = parseFloat(formData.preTaxCostOfDebt) / 100; // Convert to decimal
        var taxValue = parseFloat(formData.corporateTaxRate) / 100; // Convert to decimal
        var costOfDebt = preTaxValue * (1 - taxValue) * 100; // Convert result back to percentage

        console.log(costOfDebt);
        // Apply custom rounding
        costOfDebt = custom_calc(costOfDebt);
        console.log(costOfDebt);

        costOfDebt = costOfDebt.endsWith(".0")
          ? costOfDebt.slice(0, -2)
          : costOfDebt; // Remove trailing ".0"
        $(".span-cost_of_debt")
          .text(costOfDebt + "%")
          .parent()
          .show();
        $("#hidden_costOfDebt").val(costOfDebt);
      }

      // Setting values for #calc10
      if (currentTabId === "calc10") {
        // Inside #calc9 setting values or right before the WACC calculation
        var spanCostOfEquity = parseFloat($(".span-cost_of_equity").text()); // Retrieve and parse to float
        var spanCostOfDebt = parseFloat($(".span-cost_of_debt").text()); // Retrieve and parse to float

        // Inside #calc9 setting values
        var percentDebt = parseFloat(formData.debtPercentage); // Already a percentage, no need to divide by 100 for display

        // Apply custom rounding to displayed percentages
        var rounded_percentDebt = custom_calc(percentDebt);
        var rounded_percentEquity = custom_calc(100 - percentDebt);
        rounded_percentDebt = rounded_percentDebt.endsWith(".0")
          ? rounded_percentDebt.slice(0, -2)
          : rounded_percentDebt; // Remove trailing ".0"
        rounded_percentEquity = rounded_percentEquity.endsWith(".0")
          ? rounded_percentEquity.slice(0, -2)
          : rounded_percentEquity; // Remove trailing ".0"
        $(".span-percentage_debt")
          .text(rounded_percentDebt + "%")
          .parent()
          .show();
        $(".span-percentage_equity")
          .text(rounded_percentEquity + "%")
          .parent()
          .show();
        $("#hidden_percentDebt").val(rounded_percentDebt);
        $("#hidden_percentEquity").val(rounded_percentEquity);

        // When using percentDebt in calculations, convert to decimal
        var spanPercentageDebt = percentDebt / 100; // Convert to decimal for calculation
        var spanPercentageEquity = (100 - percentDebt) / 100; // Convert to decimal for calculation

        var wacc =
          spanCostOfEquity * spanPercentageEquity +
          spanCostOfDebt * spanPercentageDebt; // Result is a percentage
        // Apply custom rounding to WACC result
        wacc = custom_calc(wacc);
        $(".span-wacc_total")
          .text(wacc + "%")
          .parent()
          .show();
        $(".result")
          .text(wacc + "%")
          .parent()
          .show();
        $("#hidden_wacc").val(wacc);

        //Final Values
        populateHiddenFields();
      }
    }

    function custom_calc(val) {
      var val = parseFloat(val).toFixed(2);
      var str = val.toString();
      var srch = str.indexOf(".");
      if (srch > 0) {
        var splt = str.split(".");
        if (parseFloat(splt[1]) >= 75) {
          return `${Math.ceil(val)}`;
        } else if (parseFloat(splt[1]) >= 50 && parseFloat(splt[1]) <= 75) {
          return `${splt[0]}.5`;
        } else if (parseFloat(splt[1]) >= 25 && parseFloat(splt[1]) <= 50) {
          return `${splt[0]}.5`;
        } else {
          return `${splt[0]}.0`;
        }
      } else {
        return val.toString();
      }
    }

    var formData = {
      duration: null,
      valuationDate: {
        month: null,
        year: null,
      },
      country: null,
      currency: null,
      industry: null,
      small: null,
      countryRiskPremium: null,
      preTaxCostOfDebt: null,
      corporateTaxRate: null,
      debtPercentage: null,
      // Add more fields as necessary
    };

    function updateNavigationButtons() {
      const totalTabs = $(".calculator__action .nav-item").length;
      const activeTabIndex =
        $(".calculator__action .nav-item .nav-link.active").parent().index() +
        1; // Index is 0-based

      // Enable/disable prevtab button
      if (activeTabIndex === 1) {
        $(".prevtab").addClass("disabled");
      } else {
        $(".prevtab").removeClass("disabled");
      }

      // Enable/disable nexttab button
      if (activeTabIndex === totalTabs) {
        $(".nexttab").addClass("disabled");
      } else {
        $(".nexttab").removeClass("disabled");
      }

      // Update progress bar
      updateProgressBar(activeTabIndex, totalTabs);
    }

    function updateProgressBar(currentTabIndex, totalTabs) {
      var progressPercentage = (currentTabIndex / totalTabs) * 100;
      $(".progress-bar").css("width", progressPercentage + "%");
    }

    function captureFormData() {
      var $currentTab = $(".tab-pane.active");
      var currentTabId = $currentTab.attr("id");

      switch (currentTabId) {
        case "calc1":
          formData.duration = $("#duration").val();
          break;
        case "calc2":
          formData.valuationDate.month = $("#month").val();
          formData.valuationDate.year = $("#year").val();
          break;
        case "calc3":
          formData.country = $("#country").val();
          break;
        case "calc4":
          formData.currency = $("#currency").val();
          break;
        case "calc5":
          formData.industry = $("#industri").val();
          break;
        case "calc6":
          formData.small = $("#small").val();
          formData.countryRiskPremium = $("#countryRiskPremium").val();
          break;
        case "calc7":
          formData.preTaxCostOfDebt = $("#pre_tax").val();
          break;
        case "calc8":
          formData.corporateTaxRate = $("#tax").val();
          break;
        case "calc9":
          formData.debtPercentage = $("#percent_debt").val();
          break;
        // Add cases for additional steps
        default:
          break;
      }

      console.log("Capturing data for tab: ", currentTabId);
      console.log("Captured Data: ", formData);
    }

    // Initialize the jQuery Validation Plugin on the form
    $("#frm_calc").validate({
      // Validation rules,
      rules: {
        duration: {
          required: true,
        },
        month: {
          required: true,
        },
        year: {
          required: true,
        },
        country: {
          required: true,
        },
        currency: {
          required: true,
        },
        industri: {
          required: true,
        },
        small: {
          required: true,
        },
        pre_tax: {
          required: true,
        },
        tax: {
          required: true,
        },
        percent_debt: {
          required: true,
        },
      },
      messages: {
        duration: {
          required: "Please select a Duration",
        },
        month: {
          required: "Please select a Month",
        },
        year: {
          required: "Please select a Year",
        },
        country: {
          required: "Please select a Country",
        },
        currency: {
          required: "Please select a Currency",
        },
        industri: {
          required: "Please select an Industry",
        },
        small: {
          required: "Please select an value",
        },
        pre_tax: {
          required: "Please enter a value",
        },
        tax: {
          required: "Please enter a value",
        },
        percent_debt: {
          required: "Please enter a value",
        },
      },
    });
    // Function to check if current tab's inputs are valid
    function validateCurrentTab() {
      var isValid = true;
      var $currentTab = $(".tab-pane.active");
      // Validate only the inputs in the current tab
      $currentTab.find(":input").each(function () {
        if (!$(this).valid()) {
          isValid = false;
          return false; // Exit the loop
        }
      });
      return isValid;
    }

    $(".form-action .btn, .nexttab").click(function (e) {
      // Prevent form submission
      e.preventDefault();
      // Check if the current tab is valid
      if (validateCurrentTab()) {
        // Find current and next tab panels
        var $currentTabPanel = $(this).closest(".tab-pane");
        var $nextTabPanel = $currentTabPanel.next(".tab-pane");

        captureFormData();

        if ($nextTabPanel.length) {
          // Activate next tab
          var nextTabId = $nextTabPanel.attr("id");
          $('[href="#' + nextTabId + '"]').tab("show");
          // Introduce a delay before updating calculations.
          setTimeout(function () {
            updateCalculations();
          }, 100); // 100 milliseconds delay.
        }
        updateNavigationButtons();
      }
    });

    $(".nexttab").on("click", function (e) {
      // Prevent default action
      e.preventDefault();

      var activeTabPanel = $(".tab-pane.active");
      // Temporarily setting all inputs in inactive tabs to be ignored by the validator
      var $inactiveInputs = $("#frm_calc .tab-pane")
        .not(".active")
        .find(":input")
        .addClass("ignore-validation");

      if ($("#frm_calc").valid()) {
        // Validate the entire form, but with ignored inputs on inactive tabs
        var nextTabPanel = activeTabPanel.next(".tab-pane");
        if (nextTabPanel.length && !$(this).hasClass("disabled")) {
          var nextTabId = nextTabPanel.attr("id");
          $('[href="#' + nextTabId + '"]').tab("show");
          updateNavigationButtons();
        }
      }

      // Revert ignoring inputs in inactive tabs
      $inactiveInputs.removeClass("ignore-validation");
      // Update validation for current tab
      $("#frm_calc").validate().element(".tab-pane.active :input");
    });

    $(".prevtab").click(function () {
      var $currentTabPanel = $(".tab-pane.active");
      var $prevTabPanel = $currentTabPanel.prev(".tab-pane");
      if ($prevTabPanel.length) {
        // Activate previous tab
        var prevTabId = $prevTabPanel.attr("id");
        $('[href="#' + prevTabId + '"]').tab("show");
        updateNavigationButtons();
      }
    });

    updateNavigationButtons();
  }
});
