document.addEventListener("DOMContentLoaded", function() {
  // Toggle folders
  var togglers = document.getElementsByClassName("caret");
  for (var i = 0; i < togglers.length; i++) {
    togglers[i].addEventListener("click", function() {
      var nested = this.parentElement.querySelector(".nested");
      if (nested) {
        nested.classList.toggle("active");
        this.classList.toggle("caret-down");
      }
    });
  }

  // Handle file click and display in viewer
  var files = document.getElementsByClassName("file");
  for (var j = 0; j < files.length; j++) {
    files[j].addEventListener("click", function() {
      var viewer = document.getElementById("viewer");

      // Fjern aktiv markering fra alle filer
      for (var k = 0; k < files.length; k++) {
        files[k].classList.remove("active-file");
      }

      // Marker denne fil
      this.classList.add("active-file");

      // formatér tekst med linjeskift
      var formattedText = this.dataset.content.replace(/\\n/g, "<br>");
      var content = "<h2>" + this.textContent + "</h2><p>" + formattedText + "</p>";

      // vis billeder hvis de findes
      if (this.dataset.imgs) {
        var imgList = this.dataset.imgs.split('#');
        imgList.forEach(function(src) {
          content += "<img src='" + src.trim() + "' alt='værkbillede' style='max-width:100%; margin-top:1em;'>";
        });
      }

      // vis video hvis den findes
      if (this.dataset.video) {
        if (this.dataset.video.includes("youtube.com/embed")) {
          content += "<iframe width='100%' height='515' src='" + this.dataset.video + "' frameborder='0' allowfullscreen style='margin-top:1em;'></iframe>";
        } else {
          content += "<video controls style='max-width:100%; margin-top:1em;'><source src='" + this.dataset.video + "' type='video/mp4'>Din browser understøtter ikke video.</video>";
        }
        }

        // vis ekstra tekst hvis den findes
        if (this.dataset.extra) {
          var extraFormatted = this.dataset.extra.replace(/\\n/g, "<br>");
        content += "<div style='margin-top:1em; font-style:normal;'>" + extraFormatted + "</div>";
        }


      viewer.innerHTML = content;

      // håndter billedelinks
        var imageLinks = viewer.querySelectorAll(".image-link");
        imageLinks.forEach(function(link) {
          var href = link.getAttribute("href");
          
          // opret preview-element
          var preview = document.createElement("div");
          preview.className = "image-preview";
          preview.innerHTML = "<img src='" + href + "' alt='preview'>";
          link.appendChild(preview);
          
          // åbn billedet i nyt vindue ved klik
          link.addEventListener("click", function(e) {
            e.preventDefault();
            window.open(href, "_blank");
          });
        });

           // gør "+" og "-" klikbare, så man kan skifte frem og tilbage mellem de to tabeller
      if (this.dataset.content2) {
        var table1Html = formattedText;
        var table2Html = this.dataset.content2.replace(/\\n/g, "<br>");

        var showTable2 = function() {
          var table = viewer.querySelector("table");
          if (table) {
            table.outerHTML = table2Html;
          }
                    var minusBtn = viewer.querySelector(".collapse-minus");
          if (minusBtn) {
            minusBtn.addEventListener("click", function(e) {
              e.stopPropagation();
              showTable1();
            });
          }
        };

        var showTable1 = function() {
          var table = viewer.querySelector("table");
          if (table) {
            table.outerHTML = table1Html;
          }
          var plusBtn = viewer.querySelector(".expand-plus");
          if (plusBtn) {
            plusBtn.addEventListener("click", function(e) {
              e.stopPropagation();
              showTable2();
            });
          }
        };

        var expandBtn = viewer.querySelector(".expand-plus");
        if (expandBtn) {
          expandBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            showTable2();
          });
        }
      }
    });
  }
});
