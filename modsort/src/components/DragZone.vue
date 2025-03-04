<style lang="scss" scoped>
.boxi {
  width: 100%;
  height: 100%;
}
.settings {
  text-align: left;
  padding: 1em;
}

#settingsiconframe {
  text-align: right;
  height: 3rem;
}

#settingswheel {
  height: 3rem;
}

#review {
  background-color: white;
  border: 2px solid hsl(0, 0, 0);

  // color: green;
}

#swi {
  // border: 2px dashed;
  // filter: saturate(75%);
  filter: hue-rotate(-0.1turn);
}
#dwi {
  // border: 2px dashed;
  // filter: saturate(75%);
  filter: hue-rotate(-0.1turn);
}
#adc {
  // border: 2px dashed;
  // filter: saturate(75%);
  filter: hue-rotate(-0.1turn);
}
#rcbv {
  // border: 2px dashed;
  // filter: saturate(75%);
  filter: hue-rotate(-0.1turn);
}

#no_t1 {
  background-color: white;
  border: 2px solid hsl(141, 71%, 48%);

  // color: green;
}

#no_t1c {
  background-color: white;
  border: 2px solid hsl(348, 100%, 61%);
  color: hsl(348, 100%, 61%);
}

#no_t2 {
  background-color: white;
  border: 2px solid hsl(204, 86%, 53%);
  color: hsl(204, 86%, 53%);
}

#no_flair {
  background-color: white;
  border: 2px solid hsl(256, 60%, 59%);
  color: hsl(256, 60%, 59%);
}

#no_swi {
  background-color: white;
  border: 2px dashed hsl(141, 71%, 48%);
  // filter: brightness(80%);
  filter: hue-rotate(-0.1turn);
}

#no_dwi {
  background-color: white;
  border: 2px dashed hsl(348, 100%, 61%);
  color: hsl(348, 100%, 61%);
  // filter: saturate(50%);
  filter: hue-rotate(-0.1turn);
}

#no_adc {
  background-color: white;
  border: 2px dashed hsl(204, 86%, 53%);
  color: hsl(204, 86%, 53%);
  // filter: brightness(80%);
  filter: hue-rotate(-0.1turn);
}

#no_rcbv {
  background-color: white;
  border: 2px dashed hsl(256, 60%, 59%);
  color: hsl(256, 60%, 59%);
  // filter: brightness(80%);
  filter: hue-rotate(-0.1turn);
}
</style>
<template>
  <section class="section">
    <div class="container">
      <div class="drag">
        <div>
          <!-- settings -->
          <div class="settings" v-if="showSettings">
            <b-field label="folder level">
              <b-input v-model="folderLevel"></b-input>
            </b-field>
          </div>
          <!-- tiles -->
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child notification is-success" ref="t1">
                <p class="title">T1</p>
                <p class="subtitle">_t1.nii.gz</p>
                <div class="boxi"></div>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification is-danger" ref="t1c">
                <p class="title">T1c</p>
                <p class="subtitle">_t1c.nii.gz</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification is-info" ref="t2">
                <p class="title">T2</p>
                <p class="subtitle">_t2.nii.gz</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article
                class="tile is-child notification is-primary"
                ref="flair"
              >
                <p class="title">FLAIR</p>
                <p class="subtitle">_fla.nii.gz</p>
              </article>
            </div>
          </div>

          <!-- second sequences -->
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article
                class="tile is-child notification is-success"
                id="swi"
                ref="swi"
              >
                <p class="title">swi</p>
                <p class="subtitle">_swi.nii.gz</p>
                <div class="boxi"></div>
              </article>
            </div>

            <div class="tile is-parent">
              <article
                class="tile is-child notification is-danger"
                id="dwi"
                ref="dwi"
              >
                <p class="title">dwi</p>
                <p class="subtitle">_dwi.nii.gz</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article
                class="tile is-child notification is-info"
                id="adc"
                ref="adc"
              >
                <p class="title">adc</p>
                <p class="subtitle">_adc.nii.gz</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article
                class="tile is-child notification is-primary"
                id="rcbv"
                ref="rcbv"
              >
                <p class="title">rcbv</p>
                <p class="subtitle">_rcbv.nii.gz</p>
              </article>
            </div>
          </div>

          <!-- nothing row -->
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article
                class="tile is-child notification is-warning"
                ref="nothing"
              >
                <p class="title">nothing</p>
                <p class="subtitle">no modality at all</p>
                <div class="boxi"></div>
              </article>
            </div>

            <div class="tile is-parent">
              <article
                class="tile is-child notification"
                id="review"
                ref="review"
              >
                <p class="title">review</p>
                <p class="subtitle">.review</p>
              </article>
            </div>

            <div class="tile is-parent">
              <article class="tile is-child notification" ref="settings">
                <!-- settings wheel -->

                <div id="settingsiconframe">
                  <span
                    id="settingswheel"
                    class="mdi mdi-ship-wheel"
                    @click="this.toggleShowSettings"
                  ></span>

                  <p class="title">settings</p>
                  <p class="subtitle">control everything here</p>
                </div>
              </article>
            </div>
          </div>

          <!-- no standard tiles -->
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article
                class="tile is-child notification has-text-success"
                id="no_t1"
                ref="no_t1"
              >
                <p class="title">no T1</p>
                <p class="subtitle">no_t1.btk</p>
                <div class="boxi"></div>
              </article>
            </div>

            <div class="tile is-parent">
              <article
                class="tile is-child notification is-danger"
                id="no_t1c"
                ref="no_t1c"
              >
                <p class="title">no T1c</p>
                <p class="subtitle">no_t1c.btk</p>
              </article>
            </div>

            <div class="tile is-parent">
              <article
                class="tile is-child notification is-info"
                id="no_t2"
                ref="no_t2"
              >
                <p class="title">no T2</p>
                <p class="subtitle">no_t2.btk</p>
              </article>
            </div>

            <div class="tile is-parent">
              <article
                class="tile is-child notification is-primary"
                id="no_flair"
                ref="no_flair"
              >
                <p class="title">no FLAIR</p>
                <p class="subtitle">no_fla.btk</p>
              </article>
            </div>
          </div>

          <!-- no standard tiles -->
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article
                class="tile is-child notification has-text-success"
                id="no_swi"
                ref="no_swi"
              >
                <p class="title">no swi</p>
                <p class="subtitle">no_swi.btk</p>
                <div class="boxi"></div>
              </article>
            </div>

            <div class="tile is-parent">
              <article
                class="tile is-child notification is-danger"
                id="no_dwi"
                ref="no_dwi"
              >
                <p class="title">no dwi</p>
                <p class="subtitle">no_dwi.btk</p>
              </article>
            </div>

            <div class="tile is-parent">
              <article
                class="tile is-child notification is-info"
                id="no_adc"
                ref="no_adc"
              >
                <p class="title">no adc</p>
                <p class="subtitle">no_adc.btk</p>
              </article>
            </div>

            <div class="tile is-parent">
              <article
                class="tile is-child notification is-primary"
                id="no_rcbv"
                ref="no_rcbv"
              >
                <p class="title">no rcbv</p>
                <p class="subtitle">no_rcbv.btk</p>
              </article>
            </div>
          </div>

          <!-- end -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// const path = require("path");
// const { ipcRenderer } = window.require("electron");

// const electron = window.require("electron");

// const { ipcRenderer } = require("electron");
export default {
  /*
      Variables used by the drag and drop component
    */
  data() {
    return {
      dragAndDropCapable: false,
      files: [],
      folderLevel: "/..", // one directory up
      showSettings: false,
    };
  },

  mounted() {
    /*
        Determine if drag and drop functionality is capable in the browser
      */
    this.dragAndDropCapable = this.determineDragAndDropCapable();

    /*
        If drag and drop capable, then we continue to bind events to our elements.
      */

    if (this.dragAndDropCapable) {
      /*
          Listen to all of the drag events and bind an event listener to each
          for the fileform.
        */
      [
        "drag",
        "dragstart",
        "dragend",
        "dragover",
        "dragenter",
        "dragleave",
        "drop",
      ].forEach(
        function (evt) {
          /*
            For each event add an event listener that prevents the default action
            (opening the file in the browser) and stop the propagation of the event (so
            no other elements open the file in the browser)
          */
          //  t1
          this.$refs.t1.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
          //  t1c
          this.$refs.t1c.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
          //  t2
          this.$refs.t2.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
          //  flair
          this.$refs.flair.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );

          //  swi
          this.$refs.swi.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
          //  dwi
          this.$refs.dwi.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
          //  adc
          this.$refs.adc.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
          //  rcbv
          this.$refs.rcbv.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );

          //  nothing
          this.$refs.nothing.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );

          // review
          this.$refs.review.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );

          //  no t1
          this.$refs.no_t1.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
          //  no t1c
          this.$refs.no_t1c.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
          //  no t2
          this.$refs.no_t2.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
          //  no flair
          this.$refs.no_flair.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );

          //  no swi
          this.$refs.no_swi.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
          //  no dwi
          this.$refs.no_dwi.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
          //  no adc
          this.$refs.no_adc.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
          //  no rcbv
          this.$refs.no_rcbv.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );

          //   end
        }.bind(this)
      );

      /*
          Add an event listener for drop to the form
        */
      //    t1
      this.$refs.t1.addEventListener(
        "drop",
        function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // this.files.push(e.dataTransfer.files[i]);
            console.log("t1form");
            console.log(e.dataTransfer.files[i]);
            this.copyMachine(
              e.dataTransfer.files[i],
              "_t1.nii.gz",
              this.folderLevel
            );
          }
        }.bind(this)
      );
      //    t1c
      this.$refs.t1c.addEventListener(
        "drop",
        function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // this.files.push(e.dataTransfer.files[i]);
            console.log("t1cform");
            console.log(e.dataTransfer.files[i]);
            this.copyMachine(
              e.dataTransfer.files[i],
              "_t1c.nii.gz",
              this.folderLevel
            );
          }
        }.bind(this)
      );
      //    t2
      this.$refs.t2.addEventListener(
        "drop",
        function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // this.files.push(e.dataTransfer.files[i]);
            console.log("t2form");
            console.log(e.dataTransfer.files[i]);
            this.copyMachine(
              e.dataTransfer.files[i],
              "_t2.nii.gz",
              this.folderLevel
            );
          }
        }.bind(this)
      );
      //    flair
      this.$refs.flair.addEventListener(
        "drop",
        function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // this.files.push(e.dataTransfer.files[i]);
            console.log("flaform");
            console.log(e.dataTransfer.files[i]);
            this.copyMachine(
              e.dataTransfer.files[i],
              "_fla.nii.gz",
              this.folderLevel
            );
          }
        }.bind(this)
      );

      //    swi
      this.$refs.swi.addEventListener(
        "drop",
        function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // this.files.push(e.dataTransfer.files[i]);
            console.log("swiform");
            console.log(e.dataTransfer.files[i]);
            this.copyMachine(
              e.dataTransfer.files[i],
              "_swi.nii.gz",
              this.folderLevel
            );
          }
        }.bind(this)
      );
      //    dwi
      this.$refs.dwi.addEventListener(
        "drop",
        function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // this.files.push(e.dataTransfer.files[i]);
            console.log("dwicform");
            console.log(e.dataTransfer.files[i]);
            this.copyMachine(
              e.dataTransfer.files[i],
              "_dwi.nii.gz",
              this.folderLevel
            );
          }
        }.bind(this)
      );
      //    adc
      this.$refs.adc.addEventListener(
        "drop",
        function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // this.files.push(e.dataTransfer.files[i]);
            console.log("adcform");
            console.log(e.dataTransfer.files[i]);
            this.copyMachine(
              e.dataTransfer.files[i],
              "_adc.nii.gz",
              this.folderLevel
            );
          }
        }.bind(this)
      );
      //    rcbv
      this.$refs.rcbv.addEventListener(
        "drop",
        function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // this.files.push(e.dataTransfer.files[i]);
            console.log("rcbvform");
            console.log(e.dataTransfer.files[i]);
            this.copyMachine(
              e.dataTransfer.files[i],
              "_rcbv.nii.gz",
              this.folderLevel
            );
          }
        }.bind(this)
      );

      //    nothing
      this.$refs.nothing.addEventListener(
        "drop",
        function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // this.files.push(e.dataTransfer.files[i]);
            console.log("nothing_form");
            console.log(e.dataTransfer.files[i]);
            var inputFile = e.dataTransfer.files[i].path;
            this.dotFileCreator(inputFile, "no_t1.btk", this.folderLevel);
            this.dotFileCreator(inputFile, "no_t1c.btk", this.folderLevel);
            this.dotFileCreator(inputFile, "no_t2.btk", this.folderLevel);
            this.dotFileCreator(inputFile, "no_fla.btk", this.folderLevel);
          }
        }.bind(this)
      );

      //    review
      this.$refs.review.addEventListener(
        "drop",
        function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // this.files.push(e.dataTransfer.files[i]);
            console.log("review_form");
            console.log(e.dataTransfer.files[i]);
            var inputFile = e.dataTransfer.files[i].path;
            this.dotFileCreator(inputFile, "review.btk", this.folderLevel);
          }
        }.bind(this)
      );

      //    no t1
      this.$refs.no_t1.addEventListener(
        "drop",
        function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // this.files.push(e.dataTransfer.files[i]);
            console.log("no_t1form");
            console.log(e.dataTransfer.files[i]);
            var inputFile = e.dataTransfer.files[i].path;
            this.dotFileCreator(inputFile, "no_t1.btk", this.folderLevel);
          }
        }.bind(this)
      );
      //    no t1c
      this.$refs.no_t1c.addEventListener(
        "drop",
        function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // this.files.push(e.dataTransfer.files[i]);
            console.log("no_t1cform");
            console.log(e.dataTransfer.files[i]);
            var inputFile = e.dataTransfer.files[i].path;
            this.dotFileCreator(inputFile, "no_t1c.btk", this.folderLevel);
          }
        }.bind(this)
      );
      //   no t2
      this.$refs.no_t2.addEventListener(
        "drop",
        function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // this.files.push(e.dataTransfer.files[i]);
            console.log("no_t2form");
            console.log(e.dataTransfer.files[i]);
            var inputFile = e.dataTransfer.files[i].path;
            this.dotFileCreator(inputFile, "no_t2.btk", this.folderLevel);
          }
        }.bind(this)
      );
      //    no flair
      this.$refs.no_flair.addEventListener(
        "drop",
        function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // this.files.push(e.dataTransfer.files[i]);
            console.log("no_flaform");
            console.log(e.dataTransfer.files[i]);
            var inputFile = e.dataTransfer.files[i].path;
            this.dotFileCreator(inputFile, "no_fla.btk", this.folderLevel);
          }
        }.bind(this)
      );

      //    no swi
      this.$refs.no_swi.addEventListener(
        "drop",
        function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // this.files.push(e.dataTransfer.files[i]);
            console.log("no_swiform");
            console.log(e.dataTransfer.files[i]);
            var inputFile = e.dataTransfer.files[i].path;
            this.dotFileCreator(inputFile, "no_swi.btk", this.folderLevel);
          }
        }.bind(this)
      );
      //    no dwi
      this.$refs.no_dwi.addEventListener(
        "drop",
        function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // this.files.push(e.dataTransfer.files[i]);
            console.log("no_dwiform");
            console.log(e.dataTransfer.files[i]);
            var inputFile = e.dataTransfer.files[i].path;
            this.dotFileCreator(inputFile, "no_dwi.btk", this.folderLevel);
          }
        }.bind(this)
      );
      //   no adc
      this.$refs.no_adc.addEventListener(
        "drop",
        function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // this.files.push(e.dataTransfer.files[i]);
            console.log("no_adcform");
            console.log(e.dataTransfer.files[i]);
            var inputFile = e.dataTransfer.files[i].path;
            this.dotFileCreator(inputFile, "no_adc.btk", this.folderLevel);
          }
        }.bind(this)
      );
      //    np rcbv
      this.$refs.no_rcbv.addEventListener(
        "drop",
        function (e) {
          /*
            Capture the files from the drop event and add them to our local files
            array.
          */

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // this.files.push(e.dataTransfer.files[i]);
            console.log("no_rcbvform");
            console.log(e.dataTransfer.files[i]);
            var inputFile = e.dataTransfer.files[i].path;
            this.dotFileCreator(inputFile, "no_rcbv.btk", this.folderLevel);
          }
        }.bind(this)
      );
      //   end
    }
  },

  methods: {
    toggleShowSettings() {
      this.showSettings = !this.showSettings;
    },
    /*
        Determines if the drag and drop functionality is in the
        window
      */
    determineDragAndDropCapable() {
      /*
          Create a test element to see if certain events
          are present that let us do drag and drop.
        */
      var div = document.createElement("div");

      /*
          Check to see if the `draggable` event is in the element
          or the `ondragstart` and `ondrop` events are in the element. If
          they are, then we have what we need for dragging and dropping files.

          We also check to see if the window has `FormData` and `FileReader` objects
          present so we can do our AJAX uploading
        */
      return (
        ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
        "FormData" in window &&
        "FileReader" in window
      );
    },
    copyMachine(file, ending, folderLevel) {
      const os = window.electron.os;
      const path = window.electron.path;

      console.log(os.type()); // "Windows_NT"
      console.log(os.release()); // "10.0.14393"
      console.log(os.platform()); // "win32"

      console.log("separator:", path.sep); // "win32"

      // src
      var srcFile = file.path;
      console.log("srcFile:", srcFile);

      // tar
      var oldName = file.name;
      var fileNameNaked = oldName.substring(0, oldName.length - 7);

      var newName = fileNameNaked + ending;
      console.log("newName:", newName);

      // tarFolder
      console.log("srcFile:", srcFile);
      console.log("srcFile normalized:", path.normalize(srcFile));

      var definitelyPosix = srcFile.split("\\").join("/");
      console.log("definitelyPosix:", definitelyPosix);

      var tarFolder = path.dirname(definitelyPosix);
      // var tarFolder = file.path.substring(0,);
      // path.dirname(path.normalize(srcFile));

      console.log("tarFolder:", tarFolder);

      if (folderLevel != "") {
        tarFolder = path.join(tarFolder, folderLevel);
      }
      console.log("tarFolder:", tarFolder);

      var examName = path.basename(tarFolder);
      console.log("examName:", examName);

      var tarFile = path.join(tarFolder, "/", examName + "_btk_RAW/", newName);
      console.log("tarFile:", tarFile);
      window.electron.ipcRenderer.send("copyNii", srcFile, tarFile);
      window.electron.ipcRenderer.on("copyNiiComplete", (event, arg) => {
        console.log("successfully copied:", arg);
      });
    },
    dotFileCreator(inputFile, dotFileName, folderLevel) {
      const path = window.electron.path;

      var tarFolder = path.dirname(inputFile);
      console.log(inputFile);
      if (folderLevel != "") {
        tarFolder = path.join(inputFile, folderLevel);
      }

      var examName = path.basename(tarFolder);

      var tarFile = path.join(
        tarFolder,
        "/",
        examName + "_btk_RAW/",
        dotFileName
      );
      console.log("tarFile:", tarFile);

      window.electron.ipcRenderer.send("createFile", tarFile);
      window.electron.ipcRenderer.on("createFileComplete", (event, arg) => {
        console.log("successfully created:", arg);
      });
    },
  },
};
</script>
