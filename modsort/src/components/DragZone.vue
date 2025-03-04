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
export default {
  data() {
    return {
      dragAndDropCapable: false,
      files: [],
      folderLevel: "/", // one directory up
      showSettings: false,
    };
  },

  mounted() {
    this.dragAndDropCapable = this.determineDragAndDropCapable();

    if (this.dragAndDropCapable) {
      this.setupDragAndDropListeners();
    }

    // Ensure window.electron is available before setting up ipcRenderer listeners
    if (window.electron && window.electron.ipcRenderer) {
      window.electron.ipcRenderer.on("copyNiiComplete", (event, arg) => {
        console.log("successfully copied:", arg);
      });

      window.electron.ipcRenderer.on("createFileComplete", (event, arg) => {
        console.log("successfully created:", arg);
      });
    } else {
      console.error("Electron APIs are not available - preload script did not load properly");
    }
  },

  methods: {
    toggleShowSettings() {
      this.showSettings = !this.showSettings;
    },

    determineDragAndDropCapable() {
      var div = document.createElement("div");
      return (
        ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
        "FormData" in window &&
        "FileReader" in window
      );
    },

    setupDragAndDropListeners() {
      const events = [
        "drag",
        "dragstart",
        "dragend",
        "dragover",
        "dragenter",
        "dragleave",
        "drop",
      ];

      const refs = [
        "t1",
        "t1c",
        "t2",
        "flair",
        "swi",
        "dwi",
        "adc",
        "rcbv",
        "nothing",
        "review",
        "no_t1",
        "no_t1c",
        "no_t2",
        "no_flair",
        "no_swi",
        "no_dwi",
        "no_adc",
        "no_rcbv",
      ];

      refs.forEach((ref) => {
        events.forEach((evt) => {
          this.$refs[ref].addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
        });

        this.$refs[ref].addEventListener(
          "drop",
          function (e) {
            for (let i = 0; i < e.dataTransfer.files.length; i++) {
              console.log(`${ref}form`);
              console.log(e.dataTransfer.files[i]);
              const inputFile = e.dataTransfer.files[i].path;
              if (ref.startsWith("no_") || ref === "review" || ref === "nothing") {
                this.dotFileCreator(inputFile, `${ref}.btk`, this.folderLevel);
              } else {
                this.copyMachine(
                  e.dataTransfer.files[i],
                  `_${ref}.nii.gz`,
                  this.folderLevel
                );
              }
            }
          }.bind(this)
        );
      });
    },

    copyMachine(file, ending, folderLevel) {
      const os = window.electron.os;
      const path = window.electron.path;

      console.log(os.type());
      console.log(os.release());
      console.log(os.platform());

      console.log("separator:", path.sep);

      var srcFile = file.path;
      console.log("srcFile:", srcFile);

      var oldName = file.name;
      var fileNameNaked = oldName.substring(0, oldName.length - 7);

      var newName = fileNameNaked + ending;
      console.log("newName:", newName);

      console.log("srcFile:", srcFile);
      console.log("srcFile normalized:", path.normalize(srcFile));

      var definitelyPosix = srcFile.split("\\").join("/");
      console.log("definitelyPosix:", definitelyPosix);

      var tarFolder = path.dirname(definitelyPosix);

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
    },

    dotFileCreator(inputFile, dotFileName, folderLevel) {
      const path = window.electron.path;

      var tarFolder = path.dirname(inputFile);
      console.log(inputFile);
      if (folderLevel != "") {
        tarFolder = path.join(tarFolder, folderLevel);
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
    },
  },
};
</script>
