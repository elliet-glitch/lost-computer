// =================================
// CLOCK
// =================================

function updateClock() {

    const clock = document.getElementById("clock");

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    minutes = minutes < 10
        ? "0" + minutes
        : minutes;

    clock.textContent =
        `${hours}:${minutes} ${ampm}`;
}

updateClock();

setInterval(updateClock, 1000);


// =================================
// DESKTOP ICONS
// =================================

const icons =
    document.querySelectorAll(".desktop-icon");

icons.forEach(icon => {

    icon.addEventListener("dblclick", () => {

        const name = icon.dataset.window;

        if (name === "documents") {
            openDocuments();
        }

        if (name === "photos") {
            openPhotos();
        }

        if (name === "downloads") {
            openDownloads();
        }

        if (name === "browser") {
            openBrowser();
        }

        if (name === "notes") {
            openNotes();
        }

        if (name === "trash") {
            openTrash();
        }

    });

});


// =================================
// HELPER: CLOSE WINDOW
// =================================

function closeWindow(windowElement) {

    const button =
        windowElement.querySelector(".close-button");

    button.addEventListener("click", () => {
        windowElement.remove();
    });

}


// =================================
// DOCUMENTS
// =================================

function openDocuments() {

    if (document.getElementById("documents-window")) {
        return;
    }

    const windowElement =
        document.createElement("div");

    windowElement.id = "documents-window";

    windowElement.className =
        "computer-window";

    windowElement.innerHTML = `

        <div class="window-header">
            Documents

            <button class="close-button">
                ×
            </button>
        </div>

        <div class="window-content">

            <div class="file">
                <div class="file-icon">📄</div>
                <span>journal.txt</span>
            </div>

            <div class="file">
                <div class="file-icon">📄</div>
                <span>to_do.txt</span>
            </div>

            <div class="file">
                <div class="file-icon">📄</div>
                <span>letter.txt</span>
            </div>

            <div class="file">
                <div class="file-icon">📄</div>
                <span>untitled.doc</span>
            </div>

        </div>
    `;

    document
        .querySelector(".desktop")
        .appendChild(windowElement);

    closeWindow(windowElement);
}


// =================================
// PHOTOS
// =================================

function openPhotos() {

    if (document.getElementById("photos-window")) {
        return;
    }

    const windowElement = document.createElement("div");

    windowElement.id = "photos-window";

    windowElement.className =
        "computer-window photos-window";

    windowElement.innerHTML = `

        <div class="window-header">

            Photos

            <button class="close-button">
                ×
            </button>

        </div>

        <div class="window-content photo-grid">

            <div class="photo">

                <img
                    src="images/photo1.jpg"
                    alt="Photo 1"
                >

                <span>photo1.jpg</span>

            </div>

            <div class="photo">

                <img
                    src="images/photo2.JPG"
                    alt="Photo 2"
                >

                <span>photo2.JPG</span>

            </div>

            <div class="photo">

                <img
                    src="images/photo3.JPG"
                    alt="Photo 3"
                >

                <span>photo3.JPG</span>

            </div>

            <div class="photo">

                <img
                    src="images/photo4.JPG"
                    alt="Photo 4"
                >

                <span>photo4.JPG</span>

            </div>

        </div>
    `;

    document
        .querySelector(".desktop")
        .appendChild(windowElement);

    closeWindow(windowElement);


    // Double-click a photo to preview it

    const photos =
        windowElement.querySelectorAll(".photo img");

    photos.forEach(photo => {

        photo.addEventListener("dblclick", () => {

            openPhotoPreview(
                photo.src,
                photo.alt
            );

        });

    });

}
// =================================
// DOWNLOADS
// =================================

function openDownloads() {

    if (document.getElementById("downloads-window")) {
        return;
    }

    const windowElement =
        document.createElement("div");

    windowElement.id =
        "downloads-window";

    windowElement.className =
        "computer-window";

    windowElement.innerHTML = `

        <div class="window-header">
            Downloads

            <button class="close-button">
                ×
            </button>
        </div>

        <div class="window-content">

            <div class="file">
                <div class="file-icon">📷</div>
                <span>photo_backup.zip</span>
            </div>

            <div class="file">
                <div class="file-icon">📄</div>
                <span>read_me.txt</span>
            </div>

            <div class="file">
                <div class="file-icon">⚠️</div>
                <span>unknown_file.exe</span>
            </div>

        </div>
    `;

    document
        .querySelector(".desktop")
        .appendChild(windowElement);

    closeWindow(windowElement);
}


// =================================
// BROWSER
// =================================

function openBrowser() {

    if (document.getElementById("browser-window")) {
        return;
    }

    const windowElement =
        document.createElement("div");

    windowElement.id =
        "browser-window";

    windowElement.className =
        "computer-window browser-window";

    windowElement.innerHTML = `

        <div class="window-header">
            Browser

            <button class="close-button">
                ×
            </button>
        </div>

        <div class="browser-toolbar">

            <button class="browser-button">
                ←
            </button>

            <button class="browser-button">
                →
            </button>

            <input
                class="address-bar"
                value="http://oldcomputer.local"
            >

            <button class="browser-button">
                ↻
            </button>

        </div>

        <div class="browser-page">

            <h1>
                Welcome
            </h1>

            <p>
                Welcome to the Internet.
            </p>

            <p>
                This computer is connected.
            </p>

            <hr>

            <h2>
                Recently used
            </h2>

            <ul>
                <li>Documents</li>
                <li>Photos</li>
                <li>Downloads</li>
            </ul>

        </div>
    `;

    document
        .querySelector(".desktop")
        .appendChild(windowElement);

    closeWindow(windowElement);
}


// =================================
// NOTES
// =================================

function openNotes() {

    if (document.getElementById("notes-window")) {
        return;
    }

    const windowElement =
        document.createElement("div");

    windowElement.id =
        "notes-window";

    windowElement.className =
        "computer-window";

    windowElement.innerHTML = `

        <div class="window-header">
            Notes

            <button class="close-button">
                ×
            </button>
        </div>

        <div class="notes-content">

            <div class="note-line">
                <span>1</span>
                <p>
                    Remember to back up the computer.
                </p>
            </div>

            <div class="note-line">
                <span>2</span>
                <p>
                    Check the Documents folder.
                </p>
            </div>

            <div class="note-line">
                <span>3</span>
                <p>
                    Something is wrong with the files.
                </p>
            </div>

            <div class="note-line">
                <span>4</span>
                <p>
                    Do not open the unknown file.
                </p>
            </div>

        </div>
    `;

    document
        .querySelector(".desktop")
        .appendChild(windowElement);

    closeWindow(windowElement);
}


// =================================
// TRASH
// =================================

function openTrash() {

    if (document.getElementById("trash-window")) {
        return;
    }

    const windowElement =
        document.createElement("div");

    windowElement.id =
        "trash-window";

    windowElement.className =
        "computer-window";

    windowElement.innerHTML = `

        <div class="window-header">
            Trash

            <button class="close-button">
                ×
            </button>
        </div>

        <div class="window-content">

            <div class="file">
                <div class="file-icon">📄</div>
                <span>old_photo.jpg</span>
            </div>

            <div class="file">
                <div class="file-icon">📄</div>
                <span>deleted.txt</span>
            </div>

            <div class="file">
                <div class="file-icon">📄</div>
                <span>broken_file.doc</span>
            </div>

        </div>
    `;

    document
        .querySelector(".desktop")
        .appendChild(windowElement);

    closeWindow(windowElement);
}


// =================================
// FILE OPENING
// =================================

document.addEventListener("dblclick", event => {

    const file =
        event.target.closest(".file");

    if (!file) {
        return;
    }

    const fileName =
        file.querySelector("span").textContent;

    if (
        fileName.endsWith(".txt") ||
        fileName.endsWith(".doc")
    ) {
        openFile(fileName);
    }

    if (fileName === "unknown_file.exe") {
        openUnknownFile();
    }

});


// =================================
// FILE CONTENT
// =================================

function openFile(fileName) {

    if (
        document.getElementById(
            "file-" + fileName
        )
    ) {
        return;
    }

    let content = "";


    if (fileName === "journal.txt") {

        content = `

            <h3>journal.txt</h3>

            <p>
                I don't know how long this computer
                has been sitting here.
            </p>

            <p>
                I should probably back everything up.
            </p>

            ${
                localStorage.getItem("readMeOpened")
                ? `
                    <p class="strange-message">
                        You saw this too.
                    </p>
                `
                : ""
            }

        `;

    }


    if (fileName === "to_do.txt") {

        content = `

            <h3>to_do.txt</h3>

            <p>[ ] Back up files</p>

            <p>[ ] Clean out Downloads</p>

            <p>[ ] Check old photos</p>

            <p>[ ] Find a new computer</p>

        `;

    }


    if (fileName === "letter.txt") {

        content = `

            <h3>letter.txt</h3>

            <p>
                I don't think I'm coming back for this.
            </p>

            <p>
                Everything important is somewhere
                on the computer.
            </p>

        `;

    }


    if (fileName === "untitled.doc") {

        content = `

            <h3>untitled.doc</h3>

            <p>
                This document has no title.
            </p>

            <p>
                There is nothing else here.
            </p>

        `;

    }


    if (fileName === "read_me.txt") {

        localStorage.setItem(
            "readMeOpened",
            "true"
        );

        content = `

            <h3>read_me.txt</h3>

            <p>
                If you found this computer,
                please leave it alone.
            </p>

            <p>
                I don't remember what is still
                on here.
            </p>

        `;

    }


    const windowElement =
        document.createElement("div");

    windowElement.id =
        "file-" + fileName;

    windowElement.className =
        "computer-window file-window";

    windowElement.innerHTML = `

        <div class="window-header">

            ${fileName}

            <button class="close-button">
                ×
            </button>

        </div>

        <div class="file-content">

            ${content}

        </div>

    `;

    document
        .querySelector(".desktop")
        .appendChild(windowElement);

    closeWindow(windowElement);
}


// =================================
// UNKNOWN FILE
// =================================

function openUnknownFile() {

    if (
        document.getElementById(
            "unknown-window"
        )
    ) {
        return;
    }

    const windowElement =
        document.createElement("div");

    windowElement.id =
        "unknown-window";

    windowElement.className =
        "computer-window";

    windowElement.innerHTML = `

        <div class="window-header">

            System Warning

            <button class="close-button">
                ×
            </button>

        </div>

        <div class="warning-content">

            <div class="warning-icon">
                ⚠️
            </div>

            <h2>
                Unknown File
            </h2>

            <p>
                This file cannot be opened.
            </p>

            <p>
                The file may be damaged
                or incomplete.
            </p>

            <p>
                Error Code: 0x0007
            </p>

            <button class="warning-button">
                OK
            </button>

        </div>
    `;

    document
        .querySelector(".desktop")
        .appendChild(windowElement);

    closeWindow(windowElement);

    windowElement
        .querySelector(".warning-button")
        .addEventListener("click", () => {

            windowElement.remove();

        });
}
// =================================
// PHOTO PREVIEW
// =================================

function openPhotoPreview(imageSrc, imageAlt) {

    if (document.getElementById("photo-preview")) {
        return;
    }

    const preview = document.createElement("div");

    preview.id = "photo-preview";

    preview.className = "photo-preview";

    preview.innerHTML = `

        <div class="preview-window">

            <div class="window-header">

                Photo Preview

                <button class="close-button">
                    ×
                </button>

            </div>

            <div class="preview-content">

                <img
                    src="${imageSrc}"
                    alt="${imageAlt}"
                >

                <div class="preview-name">
                    ${imageAlt}
                </div>

            </div>

        </div>

    `;

    document
        .querySelector(".desktop")
        .appendChild(preview);


    // Close button

    preview
        .querySelector(".close-button")
        .addEventListener("click", () => {

            preview.remove();

        });


    // Click outside the photo to close

    preview.addEventListener("click", event => {

        if (event.target === preview) {
            preview.remove();
        }

    });

}