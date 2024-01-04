$(function () {
  // Check if jQuery is ready
  console.log("Ready");

  // Initialize id, user or bot will use the bubble chat
  let id = "user";

  // Initialize citation
  var citations = ["10", "3", "11", "21"];

  // Url to the pdf
  var pdfUrl = "pdf/example-2.pdf";

  // ================================ Responsive Script ======================================

  // Initialize the window width
  let windowWidth = $(window).width();

  // Define variables for buttons and containers
  let hidePdfBtn = $("#visibility-hide");
  let showPdfBtn = $("#visibility-show");
  let chatContainer = $(".chat-container");
  let pdfContainer = $(".pdf-container");
  let isShowingPdf = true;

  // initialize the input field
  let msgInput = $(".chat-container .input-wrapper textarea");

  // initialize the send button
  let sendBtn = $(".send-btn");

  // initialize the suggestion button
  let suggestBtn = $(".suggest-btn");

  let burgerBtn = $("#burger-btn");

  var burgerIsFocus = false;

  var burgerIsOn = false;

  let defaultInputHeight = msgInput.outerHeight();

  // Function to toggle the visibility of the PDF container
  function togglePdf(isShowing) {
    // Set the PDF container opacity to 0
    pdfContainer.css("opacity", "0");

    // Check if the window width is less than 768 pixels (considered as mobile)
    var isMobile = windowWidth <= 768;

    // Determine the CSS property for the container size based on mobile or desktop
    var containerCssProperty = isMobile ? "height" : "width";

    // Set the container size based on whether PDF is being shown or hidden
    var containerSize = isShowing ? "50%" : "100%";

    // Delay the following actions for smoother transition
    setTimeout(function () {
      // Adjust the size of the chat container
      chatContainer.css(containerCssProperty, containerSize);

      // Toggle the display of the "Show PDF" button
      if (windowWidth > 768) {
        showPdfBtn.css("display", isShowing ? "none" : "flex");
      }

      // If showing PDF, gradually increase the opacity after 300 milliseconds
      if (isShowing) {
        setTimeout(function () {
          pdfContainer.css("opacity", "1");
        }, 300);
      }
    }, 300);
  }

  // Event handler for clicking the "Hide PDF" button
  hidePdfBtn.click(function () {
    // Update the flag to indicate PDF is not showing
    isShowingPdf = false;

    // Toggle the PDF visibility
    togglePdf(isShowingPdf);

    if (windowWidth <= 768 && burgerIsFocus == false) {
      burgerIsOn = true;
      burgerBtn.css("display", "flex");
      showPdfBtn.css({
        opacity: "0",
        position: "static",
        display: "none",
        left: "0px",
        top: "0px",
      });
      suggestBtn.css({
        opacity: "0",
        position: "static",
        display: "none",
        left: "0px",
        top: "0px",
      });
    } else if (windowWidth <= 768 && burgerIsFocus) {
      burgerIsFocus = false;
      burgerBtn.css("display", "flex");
      showPdfBtn.css({
        position: "absolute",
        display: "flex",
        left: "0px",
        top: "-30px",
      });
      suggestBtn.css({
        position: "absolute",
        display: "flex",
        left: "0px",
        top: "-90px",
      });
      setTimeout(function () {
        showPdfBtn.css("display", "flex");
      }, 100);
    }
  });

  // Event handler for clicking the "Show PDF" button
  showPdfBtn.click(function () {
    burgerIsOn = false;
    burgerIsFocus = false;
    $(this).css({
      display: "none",
    });

    suggestBtn.css({
      position: "static",
      display: "flex",
      left: "0px",
      top: "0px",
    });

    burgerBtn.css({
      display: "none",
    });
    // Update the flag to indicate PDF is showing
    isShowingPdf = true;

    // Toggle the PDF visibility
    togglePdf(isShowingPdf);

    msgInput.css({
      height: "100%",
      padding: "10px 20px",
      "border-radius": "50px",
      paddingRight: sendBtn.outerWidth() + "px",
    });
    // set the send button height to normal height
    sendBtn.css({
      height: "40px",
      "border-radius": "0px 10px 10px 0px",
    });
  });

  // Event handler for clicking the "More Option" button
  burgerBtn.click(function () {
    if (burgerIsFocus) {
      burgerIsFocus = false;
      showPdfBtn.css({
        opacity: "0",
        left: "0px",
        top: "0px",
      });
      setTimeout(function () {
        showPdfBtn.css({
          position: "static",
          display: "none",
        });
      }, 200);
      setTimeout(function () {
        suggestBtn.css({
          left: "0px",
          top: "0px",
          opacity: "0",
        });
        setTimeout(function () {
          suggestBtn.css({
            position: "static",
            display: "none",
          });
        }, 200);
      }, 200);
    } else {
      burgerIsFocus = true;
      showPdfBtn.css({
        display: "flex",
        position: "absolute",
        left: "0px",
      });
      suggestBtn.css({
        display: "flex",
        position: "absolute",
        left: "0px",
      });
      setTimeout(function () {
        showPdfBtn.css({
          opacity: "1",
          top: "-30px",
        });
      }, 200);
      setTimeout(function () {
        suggestBtn.css({
          opacity: "1",
          top: "-90px",
        });
      }, 400);
    }
  });

  // ================================ Chat Script ==========================================

  // Function to send a message and append it to the chat wrapper
  function sendMessage(id) {
    // create new bubble chat
    var newBubble = $("<div>").addClass("bubble-chat " + id);

    // Title for the bubble chat
    newBubble.append($("<h1>").text(id === "user" ? "You" : "AI Assistant"));

    // Escape HTML entities to prevent code execution
    var clearInput = msgInput
      .val()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Replace new line with <br>
    clearInput = clearInput.replace(/\n/g, "<br>");

    // Create a new paragraph element
    var paragraph = $("<p>");

    // Set the HTML content of the paragraph to the escaped user input
    paragraph.html(clearInput);

    // Append the paragraph to the bubble chat
    newBubble.append(paragraph);

    if (id === "bot") {
      // create new span element for each citation

      // create a new div for citations and append spans to it
      var citationWrapper = $("<div>").addClass("citation-wrapper");
      $.each(citations, function (index, citation) {
        var citationSpan = $("<a>")
          .addClass("citation")
          .attr("href", "#" + citation)
          .text("Page. " + citation);
        citationWrapper.append(citationSpan);
      });

      // append the citation wrapper to the new bubble
      newBubble.append(citationWrapper);
    }

    // append the bubble  to chat-wrapper
    $(".chat-wrapper").append(newBubble);

    // reset the textarea input
    msgInput.val("");

    // set the scroll to the bottom to prevent overlapping
    $(".chat-wrapper").scrollTop($(".chat-wrapper")[0].scrollHeight);
  }

  msgInput.css({
    paddingRight: sendBtn.outerWidth() + "px",
  });

  if (windowWidth <= 768) {
    sendBtn.css({
      height: defaultInputHeight + "px",
    });
  }

  // handle while the textarea focus
  msgInput.on("focus", function () {
    var currentText = msgInput.val().replace(/\n/g, "");
    var currentLength = currentText.length;
    var lines = msgInput.val().split("\n");
    var lineCount = lines.length;

    if (windowWidth <= 786) {
      if (currentLength > 500 || lineCount >= 5) {
        // Update the flag to indicate PDF is not showing
        isShowingPdf = false;

        // Toggle the PDF visibility
        togglePdf(isShowingPdf);
        $(this).css({
          height: "150px",
        });
        sendBtn.css({
          height: "150px",
        });
      }
      if (burgerIsFocus) {
        burgerIsFocus = false;
        showPdfBtn.css({
          opacity: "0",
          left: "0px",
          top: "0px",
        });
        setTimeout(function () {
          showPdfBtn.css({
            position: "static",
            display: "none",
          });
        }, 200);
        setTimeout(function () {
          suggestBtn.css({
            left: "0px",
            top: "0px",
            opacity: "0",
          });
          setTimeout(function () {
            suggestBtn.css({
              position: "static",
              display: "none",
            });
          }, 200);
        }, 200);
      }
    }
    if (burgerIsOn == true) {
      burgerBtn.css("display", "none");
    }
    $(this).css({
      padding: "20px 20px",
      transition: "0.3 ease",
      "border-radius": "10px",
      paddingRight: sendBtn.outerWidth() + "px",
    });
    // increase height for the send btn
    sendBtn.css({
      height: "55px",
    });

    $(".recommendation-modal").removeClass("active");
  });

  // handle the textarea when not used or blur
  msgInput.on("blur", function () {
    if (windowWidth <= 768) {
      if ((isShowingPdf = false && burgerIsOn == false)) {
        // Update the flag to indicate PDF is showing
        isShowingPdf = true;

        // Toggle the PDF visibility
        togglePdf(isShowingPdf);
      }
    }
    if (burgerIsOn == true) {
      burgerBtn.css({
        display: "flex",
      });
    }

    $(this).css({
      height: "100%",
      padding: "10px 20px",
      "border-radius": "50px",
      paddingRight: sendBtn.outerWidth() + "px",
    });
    // set the send button height to normal height
    sendBtn.css({
      height: defaultInputHeight + "px",
      "border-radius": "0px 10px 10px 0px",
    });
  });

  // toggle class active when suggest button is clicked
  suggestBtn.click(function () {
    $(".recommendation-modal").toggleClass("off");
  });

  // Event handler for input in the textarea
  msgInput.on("input", function () {
    var currentText = msgInput.val().replace(/\n/g, "");
    var currentLength = currentText.length;
    var lines = msgInput.val().split("\n");
    var lineCount = lines.length;

    var isLineNull = true;

    // check if there is a text inside the lines
    $.each(lines, function (index, line) {
      if (line !== "") {
        isLineNull = false;
        return false;
      }
    });

    if (isLineNull == false) {
      if (currentLength > 500 || lineCount >= 5) {
        if (windowWidth <= 768) {
          // Update the flag to indicate PDF is not showing
          isShowingPdf = false;

          // Toggle the PDF visibility
          togglePdf(isShowingPdf);
        }
        $(this).css({
          height: "150px",
        });
        sendBtn.css({
          height: "150px",
          transition: "0.3 ease",
        });
      } else {
        $(this).css({
          height: "100%",
        });
        sendBtn.css({
          height: "55px",
        });
      }
    }

    // Remove or show warning based on input length
    $("#warning-input").remove();
    var warning = $("<span>").attr("id", "warning-input");
    var message = "The character you entered has more than 1000 characters.";
    if (currentLength > 1000) {
      warning.addClass("active");
      warning.html(message);
      $(".chat-container .input-wrapper").append(warning);
    } else {
      warning.removeClass("active");
    }
  });

  // Trigger input event to initialize the state
  msgInput.trigger("input");

  var sendClicks = 0;
  // Event handler for clicking the send button
  $(".input-wrapper").on("click", ".send-btn", function () {
    console.log(++sendClicks);
    var currentText = msgInput.val().replace(/\n/g, "");
    var currentLength = currentText.length;
    if (currentLength !== 0 && currentLength <= 1000) {
      sendMessage(id);
    }

    if (windowWidth <= 768) {
      if (burgerIsOn == false) {
        // Update the flag to indicate PDF is showing
        isShowingPdf = true;

        // Toggle the PDF visibility
        togglePdf(isShowingPdf);
      }
    }
  });

  // Event handler for keypress in the textarea (Enter key without shift)
  msgInput.on("keypress", function (e) {
    var currentText = msgInput.val().replace(/\n/g, "");
    var currentLength = currentText.length;
    var lines = msgInput.val().split("\n");

    var isLineNull = true;

    $.each(lines, function (index, line) {
      if (line !== "") {
        isLineNull = false;
        return false;
      }
    });
    // prevent enter to create a new line and make sure the enter can send the message
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      // prevent entering the message if lenght is not valid
      if (isLineNull == false) {
        if (currentLength !== 0 && currentLength <= 1000) {
          $(this).css({
            height: "100%",
          });
          sendBtn.css({
            height: "55px",
            transition: ".3s ease",
          });
          if (windowWidth <= 768) {
            if (burgerIsOn == false) {
              // Update the flag to indicate PDF is showing
              isShowingPdf = true;

              // Toggle the PDF visibility
              togglePdf(isShowingPdf);
            }
          }
          sendMessage(id);
        }
      }
    }
  });

  // initialize array of all suggestions
  var suggestions = $(".suggestion");

  // input the suggestion text when the suggestion is clicked
  suggestions.each(function (index, suggestion) {
    $(suggestion).click(function () {
      msgInput.val($(suggestion).text());
    });
  });

  var citeClicked = false;

  $(".chat-wrapper").on("click", ".citation-wrapper .citation", function () {
    citeClicked = true;
  });

  // ================================ PDF Script ==========================================

  // **NOTE: If a fetch error or fetch failed occurs, it may be because the user is using IDM (internet download manager) on their device, causing IDM to intercept the library fetch. Therefore, the user needs to disable IDM first. There is also the possibility of other issues, such as using an older browser version that does not support the PDF.js library being used. This script cannot be executed without a server or localhost.

  // Load the PDF document using pdfjsLib and handle its promise
  pdfjsLib.getDocument(pdfUrl).promise.then(function (pdfDoc) {
    // Total number of pages in the PDF document
    const maxPages = pdfDoc.numPages;

    // Display PDF pages
    for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
      // Create a canvas element for each page and set its ID based on the page number
      const canvas = $("<canvas>").addClass("pdf").attr("id", pageNum);

      // Get the page from the PDF document
      pdfDoc.getPage(pageNum).then(function (page) {
        // Append the canvas to the container using jQuery
        $(".pdf-wrapper").append(canvas);

        // Set the rendering quality of the PDF
        const viewport = page.getViewport({ scale: 5 });
        canvas[0].width = viewport.width;
        canvas[0].height = viewport.height;

        // Render the PDF page to the canvas
        const renderContext = {
          canvasContext: canvas[0].getContext("2d"),
          viewport: viewport,
        };
        page.render(renderContext);
      });
    }

    // Initialize variables for current page and scrolling state
    let currentPage = 1;
    let scroll = true;

    // Handle focus event on the current page input field
    $("#curr-page").on("focus", function () {
      // Disable scrolling
      scroll = false;

      // Handle input event on the current page input field
      $(this).on("input", function (event) {
        var pageVal = parseInt($(this).val());

        // Ensure the entered page number is within the valid range
        if (pageVal > maxPages) {
          currentPage = maxPages;
        } else if (pageVal <= 1) {
          currentPage = 1;
          // Prevent pdf header overlapping
          if (windowWidth <= 768) {
            $(".pdf-wrapper").css({ paddingTop: "65px" });
          } else {
            $(".pdf-wrapper").css({ paddingTop: "85px" });
          }
        } else {
          currentPage = pageVal;
        }

        // Update the input field value and scroll to the specified page
        $(this).val(currentPage);
        setTimeout(function () {
          scrollToPage(currentPage);
        }, 300);
      });
    });

    // Handle blur event on the current page input field
    $("#curr-page").on("blur", function () {
      // Enable scrolling
      scroll = true;
    });

    // Display the total number of pages in the PDF document
    $("#max-page-num").text("/ " + maxPages);

    // Handle click event on the "Up Page" button
    $("#up-page").click(function () {
      // Prevent Click when current page is max pages
      if (currentPage < maxPages) {
        currentPage++;
        scrollToPage(currentPage);
      }
      // prevent the overlapping of the current page
      setTimeout(function () {
        // Update the input field value after scrolling
        $("#curr-page").val(currentPage);
      }, 300);
    });

    // Handle click event on the "Down Page" button
    $("#down-page").click(function () {
      // Prevent pdf header overlapping
      if (windowWidth <= 768) {
        $(".pdf-wrapper").css({ paddingTop: "65px" });
      } else {
        $(".pdf-wrapper").css({ paddingTop: "85px" });
      }

      // Prevent Click when current page is one
      if (currentPage > 1) {
        currentPage--;
        scrollToPage(currentPage);
      }
      // prevent the overlapping of the current page
      setTimeout(function () {
        // Update the input field value after scrolling
        $("#curr-page").val(currentPage);
      }, 300);
    });

    // Function to scroll to the specified page
    function scrollToPage(pageNum) {
      // targeted canvas based on id
      const targetCanvas = $(`#${pageNum}`)[0];
      if (targetCanvas) {
        // Scroll to the specified page
        targetCanvas.scrollIntoView({ block: "start" });
      }
    }

    // Update current page based on scroll position
    $(".pdf-wrapper").scroll(function () {
      // Prevent pdf header overlapping
      if (citeClicked) {
        if (windowWidth <= 768) {
          $(".pdf-wrapper").css({ paddingTop: "65px" });
        } else {
          $(".pdf-wrapper").css({ paddingTop: "85px" });
        }
      }
      // prevent scrolling when the current page input on focus
      if (scroll) {
        const canvas = $(".pdf");
        const scrollTop = $(".pdf-wrapper").scrollTop();
        const canvasHeight = canvas.outerHeight(true);

        // Calculate the current page based on the scroll position
        currentPage =
          Math.ceil(scrollTop / canvasHeight) < 1
            ? 1
            : Math.ceil(scrollTop / canvasHeight);

        // Update the current page value in the input field
        $("#curr-page").val(currentPage);
      }
    });

    // Initialize the zoom level and display it
    let currentZoom = 75;
    $("#val-zoom").text(currentZoom + "%");

    // Handle click event on the "Zoom In" button
    $("#zoom-in").click(function () {
      if (currentZoom < 175) {
        currentZoom += 25;
      }
      // Update the zoom level
      updateZoom();
    });

    // Handle click event on the "Zoom Out" button
    $("#zoom-out").click(function () {
      if (currentZoom > 25) {
        currentZoom -= 25;
      }
      // Update the zoom level
      updateZoom();
    });

    // Function to update the zoom level and apply it to all canvas elements
    function updateZoom() {
      $("#val-zoom").text(currentZoom + "%");
      // update the width of the canvas same as the zoom level
      $(".pdf").each(function () {
        $(this).css({
          width: currentZoom + "%",
        });
      });
    }
  });
});
