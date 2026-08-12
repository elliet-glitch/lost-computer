// ==========================================================
// LOST COMPUTER — MACINTOSH INTERFACE
// ==========================================================


// ==========================================================
// CLOCK
// ==========================================================

function updateClock() {

    const clock = document.getElementById("clock");

    if (!clock) return;

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours || 12;

    minutes =
        minutes < 10
            ? "0" + minutes
            : minutes;

    clock.textContent =
        `${hours}:${minutes} ${ampm}`;
}

updateClock();

setInterval(updateClock, 1000);


// ==========================================================
// DATE
// ==========================================================

function updateDate() {

    const dateElement =
        document.getElementById("menu-date");

    if (!dateElement) return;

    const now = new Date();

    dateElement.textContent =
        now.toLocaleDateString(
            "en-US",
            {
                weekday: "short",
                month: "short",
                day: "numeric"
            }
        );
}

updateDate();


// ==========================================================
// DISCOVERIES
// ==========================================================

let discoveries =
    JSON.parse(
        localStorage.getItem(
            "lostComputerDiscoveries"
        )
    ) || [];


function recordDiscovery(name) {

    if (!discoveries.includes(name)) {

        discoveries.push(name);

        localStorage.setItem(
            "lostComputerDiscoveries",
            JSON.stringify(discoveries)
        );

    }
}


// ==========================================================
// DESKTOP ITEMS
// ==========================================================

const desktopItems =
    document.querySelectorAll(
        ".desktop-item"
    );


desktopItems.forEach(item => {

    item.addEventListener(
        "dblclick",
        () => {

            const windowName =
                item.dataset.window;

            const fileName =
                item.dataset.file;


            if (fileName) {

                openFile(fileName);

                return;
            }


            switch (windowName) {

                case "school":
                    openSchool();
                    break;

                case "photos":
                    openPhotos();
                    break;

                case "downloads":
                    openDownloads();
                    break;

                case "browser":
                    openBrowser();
                    break;

                case "notes":
                    openNotes();
                    break;

                case "trash":
                    openTrash();
                    break;

            }

        }
    );


    item.addEventListener(
        "click",
        () => {

            const fileName =
                item.dataset.file;

            if (fileName) {

                setSystemMessage(
                    `${fileName} selected`
                );

            }

        }
    );

});


// ==========================================================
// APPLE MENU
// ==========================================================

const appleLogo =
    document.getElementById(
        "apple-logo"
    );

const appleMenu =
    document.getElementById(
        "apple-menu"
    );


if (appleLogo && appleMenu) {

    appleLogo.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            appleMenu.classList.toggle(
                "visible"
            );

        }
    );

}


document.addEventListener(
    "click",
    event => {

        if (
            appleMenu &&
            !appleMenu.contains(event.target) &&
            event.target !== appleLogo
        ) {

            appleMenu.classList.remove(
                "visible"
            );

        }

    }
);


// ==========================================================
// APPLE MENU ITEMS
// ==========================================================

if (appleMenu) {

    const menuEntries =
        appleMenu.querySelectorAll(
            ".apple-menu-entry"
        );


    menuEntries.forEach(entry => {

        entry.addEventListener(
            "click",
            () => {

                const text =
                    entry.textContent.trim();


                if (
                    text.includes(
                        "About This Mac"
                    )
                ) {

                    openAboutMac();

                }


                if (
                    text.includes(
                        "System Preferences"
                    )
                ) {

                    openPreferences();

                }


                if (
                    text.includes(
                        "Force Quit"
                    )
                ) {

                    openForceQuit();

                }


                appleMenu.classList.remove(
                    "visible"
                );

            }
        );

    });

}


// ==========================================================
// CREATE WINDOW
// ==========================================================

function createWindow(
    title,
    content,
    className = ""
) {

    const windowElement =
        document.createElement("div");


    windowElement.className =
        `computer-window ${className}`;


    windowElement.innerHTML = `

        <div class="window-header">

            <div class="window-controls">

                <button
                    class="window-dot close-dot"
                    aria-label="Close">
                </button>

                <button
                    class="window-dot minimize-dot"
                    aria-label="Minimize">
                </button>

                <button
                    class="window-dot maximize-dot"
                    aria-label="Maximize">
                </button>

            </div>


            <div class="window-title">
                ${title}
            </div>

        </div>


        ${content}

    `;


    document
        .getElementById("desktop")
        .appendChild(windowElement);


    const closeButton =
        windowElement.querySelector(
            ".close-dot"
        );


    closeButton.addEventListener(
        "click",
        () => {

            windowElement.remove();

        }
    );


    const minimizeButton =
        windowElement.querySelector(
            ".minimize-dot"
        );


    minimizeButton.addEventListener(
        "click",
        () => {

            windowElement.classList.toggle(
                "minimized"
            );

        }
    );


    const maximizeButton =
        windowElement.querySelector(
            ".maximize-dot"
        );


    maximizeButton.addEventListener(
        "click",
        () => {

            windowElement.classList.toggle(
                "maximized"
            );

        }
    );


    windowElement.addEventListener(
        "mousedown",
        () => {

            windowElement.style.zIndex =
                Date.now();

        }
    );


    makeDraggable(windowElement);


    return windowElement;
}


// ==========================================================
// DRAG WINDOWS
// ==========================================================

function makeDraggable(
    windowElement
) {

    const header =
        windowElement.querySelector(
            ".window-header"
        );


    let dragging = false;

    let offsetX = 0;
    let offsetY = 0;


    header.addEventListener(
        "mousedown",
        event => {

            if (
                event.target.closest(
                    ".window-controls"
                )
            ) {

                return;

            }


            if (
                windowElement.classList.contains(
                    "maximized"
                )
            ) {

                return;

            }


            dragging = true;


            offsetX =
                event.clientX -
                windowElement.offsetLeft;


            offsetY =
                event.clientY -
                windowElement.offsetTop;


            windowElement.style.zIndex =
                Date.now();

        }
    );


    document.addEventListener(
        "mousemove",
        event => {

            if (!dragging) return;


            let left =
                event.clientX -
                offsetX;


            let top =
                event.clientY -
                offsetY;


            const menuHeight = 28;


            left =
                Math.max(
                    0,
                    Math.min(
                        left,
                        window.innerWidth -
                        windowElement.offsetWidth
                    )
                );


            top =
                Math.max(
                    menuHeight,
                    Math.min(
                        top,
                        window.innerHeight -
                        windowElement.offsetHeight -
                        5
                    )
                );


            windowElement.style.left =
                `${left}px`;


            windowElement.style.top =
                `${top}px`;

        }
    );


    document.addEventListener(
        "mouseup",
        () => {

            dragging = false;

        }
    );

}


// ==========================================================
// SCHOOL FOLDER
// ==========================================================

function openSchool() {

    if (
        document.getElementById(
            "school-window"
        )
    ) {

        return;

    }


    recordDiscovery("school");


    const content = `

        <div class="finder-toolbar">

            <button class="toolbar-button">
                ‹
            </button>

            <button class="toolbar-button">
                ›
            </button>

            <span class="toolbar-folder">
                school
            </span>

        </div>


        <div class="window-content file-list">


            <div class="file"
                 data-file="Essay.docx">

                <div class="file-icon document-small">
                    DOC
                </div>

                <span>
                    Essay.docx
                </span>

            </div>


            <div class="file"
                 data-file="Essay (1).docx">

                <div class="file-icon document-small">
                    DOC
                </div>

                <span>
                    Essay (1).docx
                </span>

            </div>


            <div class="file"
                 data-file="resume_FINAL2.pdf">

                <div class="file-icon pdf-small">
                    PDF
                </div>

                <span>
                    resume_FINAL2.pdf
                </span>

            </div>


            <div class="file"
                 data-file="resume_FINAL_FINAL.pdf">

                <div class="file-icon pdf-small">
                    PDF
                </div>

                <span>
                    resume_FINAL_FINAL.pdf
                </span>

            </div>


            <div class="file"
                 data-file="Class Schedule.pdf">

                <div class="file-icon pdf-small">
                    PDF
                </div>

                <span>
                    Class Schedule.pdf
                </span>

            </div>


            <div class="file"
                 data-file="things_to_do.txt">

                <div class="file-icon text-small">
                    TXT
                </div>

                <span>
                    things_to_do.txt
                </span>

            </div>


            <div class="file"
                 data-file="Untitled.docx">

                <div class="file-icon document-small">
                    DOC
                </div>

                <span>
                    Untitled.docx
                </span>

            </div>


            <div class="file"
                 data-file="form.png">

                <div class="file-icon image-small">
                    IMG
                </div>

                <span>
                    form.png
                </span>

            </div>


            <div class="file"
                 data-file="old stuff">

                <div class="file-icon folder-small">
                    📁
                </div>

                <span>
                    old stuff
                </span>

            </div>


        </div>

    `;


    const windowElement =
        createWindow(
            "school",
            content,
            "finder-window"
        );


    windowElement.id =
        "school-window";


    attachFileListeners(
        windowElement
    );

}


// ==========================================================
// PHOTOS
// ==========================================================

function openPhotos() {

    if (
        document.getElementById(
            "photos-window"
        )
    ) {

        return;

    }


    recordDiscovery("photos");


    const content = `

        <div class="window-content photo-grid">


            <div class="photo">

                <img
                    src="images/photo1.jpg"
                    alt="IMG_2381.JPG"
                >

                <span>
                    IMG_2381.JPG
                </span>

            </div>


            <div class="photo">

                <img
                    src="images/photo2.JPG"
                    alt="IMG_2417.JPG"
                >

                <span>
                    IMG_2417.JPG
                </span>

            </div>


            <div class="photo">

                <img
                    src="images/photo3.JPG"
                    alt="IMG_3849.JPG"
                >

                <span>
                    IMG_3849.JPG
                </span>

            </div>


            <div class="photo">

                <img
                    src="images/photo4.JPG"
                    alt="IMG_4920.JPG"
                >

                <span>
                    IMG_4920.JPG
                </span>

            </div>


        </div>

    `;


    const windowElement =
        createWindow(
            "Photos",
            content,
            "photos-window"
        );


    windowElement.id =
        "photos-window";


    const photos =
        windowElement.querySelectorAll(
            ".photo"
        );


    photos.forEach(photo => {

        photo.addEventListener(
            "dblclick",
            () => {

                const image =
                    photo.querySelector(
                        "img"
                    );


                recordDiscovery(
                    image.alt
                );


                openPhotoPreview(
                    image.src,
                    image.alt
                );

            }
        );

    });

}


// ==========================================================
// PHOTO PREVIEW
// ==========================================================

function openPhotoPreview(
    src,
    name
) {

    const preview =
        document.createElement("div");


    preview.className =
        "photo-preview";


    preview.innerHTML = `

        <div class="preview-window">

            <div class="preview-header">

                <div class="window-controls">

                    <button
                        class="window-dot close-dot">
                    </button>

                </div>

                <span>
                    ${name}
                </span>

            </div>


            <div class="preview-content">

                <img
                    src="${src}"
                    alt="${name}"
                >

            </div>

        </div>

    `;


    document
        .getElementById("desktop")
        .appendChild(preview);


    preview
        .querySelector(".close-dot")
        .addEventListener(
            "click",
            () => {

                preview.remove();

            }
        );

}


// ==========================================================
// DOWNLOADS
// ==========================================================

function openDownloads() {

    if (
        document.getElementById(
            "downloads-window"
        )
    ) {

        return;

    }


    recordDiscovery("downloads");


    const content = `

        <div class="finder-toolbar">

            <button class="toolbar-button">
                ‹
            </button>

            <button class="toolbar-button">
                ›
            </button>

            <span class="toolbar-folder">
                Downloads
            </span>

        </div>


        <div class="window-content file-list">


            <div class="file"
                 data-file="Screenshot_2024-10-17.png">

                <div class="file-icon image-small">
                    IMG
                </div>

                <span>
                    Screenshot_2024-10-17.png
                </span>

            </div>


            <div class="file"
                 data-file="IMG_OLD.zip">

                <div class="file-icon folder-small">
                    ZIP
                </div>

                <span>
                    IMG_OLD.zip
                </span>

            </div>


            <div class="file"
                 data-file="moving checklist.txt">

                <div class="file-icon text-small">
                    TXT
                </div>

                <span>
                    moving checklist.txt
                </span>

            </div>


            <div class="file"
                 data-file="resume template.pdf">

                <div class="file-icon pdf-small">
                    PDF
                </div>

                <span>
                    resume template.pdf
                </span>

            </div>


            <div class="file"
                 data-file="backup_complete.txt">

                <div class="file-icon text-small">
                    TXT
                </div>

                <span>
                    backup_complete.txt
                </span>

            </div>


            <div class="file"
                 data-file="ChromeSetup.exe">

                <div class="file-icon folder-small">
                    APP
                </div>

                <span>
                    ChromeSetup.exe
                </span>

            </div>


        </div>

    `;


    const windowElement =
        createWindow(
            "Downloads",
            content,
            "finder-window"
        );


    windowElement.id =
        "downloads-window";


    attachFileListeners(
        windowElement
    );

}


// ==========================================================
// BROWSER
// ==========================================================

function openBrowser() {

    if (
        document.getElementById(
            "browser-window"
        )
    ) {

        return;

    }


    recordDiscovery("browser");


    const content = `

        <div class="browser-toolbar">

            <button class="toolbar-button">
                ‹
            </button>

            <button class="toolbar-button">
                ›
            </button>

            <input
                class="address-bar"
                value="chrome://history"
                readonly
            >

        </div>


        <div class="browser-page">

            <h1>
                History
            </h1>

            <p>
                Recent activity
            </p>


            <ul class="search-history">

                <li>
                    Canvas
                    <span class="search-date">
                        Aug 28
                    </span>
                </li>

                <li>
                    UTD academic calendar
                    <span class="search-date">
                        Sep 3
                    </span>
                </li>

                <li>
                    cheap meals near campus
                    <span class="search-date">
                        Sep 16
                    </span>
                </li>

                <li>
                    how to make a resume
                    <span class="search-date">
                        Oct 4
                    </span>
                </li>

                <li>
                    Photoshop shortcuts
                    <span class="search-date">
                        Nov 12
                    </span>
                </li>

                <li>
                    graduation requirements
                    <span class="search-date">
                        Mar 19
                    </span>
                </li>

                <li>
                    jobs for recent graduates
                    <span class="search-date">
                        Apr 2
                    </span>
                </li>

                <li>
                    apartments near downtown
                    <span class="search-date">
                        Apr 11
                    </span>
                </li>

                <li>
                    how much does it cost to move
                    <span class="search-date">
                        Apr 20
                    </span>
                </li>

                <li>
                    moving checklist
                    <span class="search-date">
                        May 3
                    </span>
                </li>

                <li>
                    transfer files to new computer
                    <span class="search-date">
                        May 17
                    </span>
                </li>

                <li>
                    factory reset laptop
                    <span class="search-date">
                        May 18
                    </span>
                </li>

            </ul>

        </div>

    `;


    const windowElement =
        createWindow(
            "Google Chrome",
            content,
            "browser-window"
        );


    windowElement.id =
        "browser-window";

}


// ==========================================================
// NOTES
// ==========================================================

function openNotes() {

    if (
        document.getElementById(
            "notes-window"
        )
    ) {

        return;

    }


    recordDiscovery("notes");


    const content = `

        <div class="notes-content">

            <div class="note-line">
                <span class="note-number">01</span>
                <p>buy toothpaste</p>
            </div>

            <div class="note-line">
                <span class="note-number">02</span>
                <p>email professor</p>
            </div>

            <div class="note-line">
                <span class="note-number">03</span>
                <p>return library books</p>
            </div>

            <div class="note-line">
                <span class="note-number">04</span>
                <p>call mom</p>
            </div>

            <div class="note-line">
                <span class="note-number">05</span>
                <p>find boxes</p>
            </div>

            <div class="note-line">
                <span class="note-number">06</span>
                <p>cancel internet</p>
            </div>

            <div class="note-line">
                <span class="note-number">07</span>
                <p>clean out fridge</p>
            </div>

            <div class="note-line">
                <span class="note-number">08</span>
                <p>give keys back Friday</p>
            </div>

            <div class="note-line">
                <span class="note-number">09</span>
                <p>don't forget the laptop</p>
            </div>

            <div class="note-line">
                <span class="note-number">10</span>
                <p>I think I'm ready</p>
            </div>

        </div>

    `;


    const windowElement =
        createWindow(
            "Notes",
            content
        );


    windowElement.id =
        "notes-window";

}


// ==========================================================
// TRASH
// ==========================================================

function openTrash() {

    if (
        document.getElementById(
            "trash-window"
        )
    ) {

        return;

    }


    recordDiscovery("trash");


    const content = `

        <div class="finder-toolbar">

            <button class="toolbar-button">
                ‹
            </button>

            <button class="toolbar-button">
                ›
            </button>

            <span class="toolbar-folder">
                Trash
            </span>

        </div>


        <div class="window-content file-list">


            <div class="file"
                 data-file="IMG_1002.JPG">

                <div class="file-icon image-small">
                    IMG
                </div>

                <span>
                    IMG_1002.JPG
                </span>

            </div>


            <div class="file"
                 data-file="old schedule.pdf">

                <div class="file-icon pdf-small">
                    PDF
                </div>

                <span>
                    old schedule.pdf
                </span>

            </div>


            <div class="file"
                 data-file="resume.docx">

                <div class="file-icon document-small">
                    DOC
                </div>

                <span>
                    resume.docx
                </span>

            </div>


            <div class="file"
                 data-file="dorm room.jpg">

                <div class="file-icon image-small">
                    IMG
                </div>

                <span>
                    dorm room.jpg
                </span>

            </div>


            <div class="file"
                 data-file="Untitled (7).docx">

                <div class="file-icon document-small">
                    DOC
                </div>

                <span>
                    Untitled (7).docx
                </span>

            </div>


        </div>

    `;


    const windowElement =
        createWindow(
            "Trash",
            content,
            "finder-window"
        );


    windowElement.id =
        "trash-window";


    attachFileListeners(
        windowElement
    );

}


// ==========================================================
// FILE LISTENERS
// ==========================================================

function attachFileListeners(
    windowElement
) {

    const files =
        windowElement.querySelectorAll(
            ".file"
        );


    files.forEach(file => {

        file.addEventListener(
            "dblclick",
            () => {

                const fileName =
                    file.dataset.file;


                if (fileName) {

                    openFile(fileName);

                }

            }
        );

    });

}


// ==========================================================
// FILE CONTENT
// ==========================================================

const fileContents = {

    "things_to_do.txt": `

        <h3>things_to_do.txt</h3>

        <div class="file-date">
            modified May 17
        </div>

        <p>email professor</p>
        <p>finish portfolio</p>
        <p>clean room</p>
        <p>return books</p>
        <p>find boxes</p>
        <p>cancel internet</p>
        <p>figure out what to do with the computer</p>

    `,


    "resume_FINAL2.pdf": `

        <h3>resume_FINAL2.pdf</h3>

        <div class="file-date">
            modified April 3
        </div>

        <p>EDUCATION</p>

        <p>
            Bachelor of Arts
        </p>

        <p>
            Expected Graduation: May
        </p>

        <p>EXPERIENCE</p>

        <p>
            Student Assistant
        </p>

        <p>
            Design Intern
        </p>

        <p>SKILLS</p>

        <p>
            Adobe Creative Cloud
        </p>

        <p>
            HTML / CSS
        </p>

    `,


    "resume_FINAL_FINAL.pdf": `

        <h3>resume_FINAL_FINAL.pdf</h3>

        <div class="file-date">
            modified April 4
        </div>

        <p>
            Same resume.
        </p>

        <p>
            Slightly different formatting.
        </p>

        <p>
            Why are there so many copies of this.
        </p>

    `,


    "Class Schedule.pdf": `

        <h3>Class Schedule.pdf</h3>

        <div class="file-date">
            Fall Semester
        </div>

        <p>Monday</p>
        <p>10:00 — Class</p>
        <p>2:00 — Class</p>

        <p>Tuesday</p>
        <p>9:30 — Work</p>

        <p>Wednesday</p>
        <p>10:00 — Class</p>

        <p>Friday</p>
        <p>11:00 — Class</p>

    `,


    "Untitled.docx": `

        <h3>Untitled.docx</h3>

        <div class="file-date">
            modified May 18
        </div>

        <p>
            I keep thinking there should be
            something I need to write down.
        </p>

        <p>
            But I don't know what.
        </p>

    `,


    "moving checklist.txt": `

        <h3>moving checklist.txt</h3>

        <p>[x] clothes</p>
        <p>[x] books</p>
        <p>[x] kitchen</p>
        <p>[x] desk</p>
        <p>[x] apartment</p>
        <p>[x] keys</p>
        <p>[ ] laptop</p>

    `,


    "backup_complete.txt": `

        <h3>backup_complete.txt</h3>

        <p>
            Backup finished.
        </p>

        <p>
            Photos: complete
        </p>

        <p>
            Documents: complete
        </p>

        <p>
            Personal files: complete
        </p>

        <p>
            Music: complete
        </p>

        <br>

        <p>
            Ready for reset.
        </p>

    `,


    "IMG_OLD.zip": `

        <h3>IMG_OLD.zip</h3>

        <div class="file-date">
            archive created 2023
        </div>

        <p>382 files</p>
        <p>14 videos</p>
        <p>2 folders</p>

        <p>
            Last opened: 2023
        </p>

    `,


    "old schedule.pdf": `

        <h3>old schedule.pdf</h3>

        <p>Monday — 8:00 AM</p>
        <p>Tuesday — 11:00 AM</p>
        <p>Wednesday — 8:00 AM</p>
        <p>Thursday — 11:00 AM</p>
        <p>Friday — No class</p>

        <br>

        <p>
            Semester 1
        </p>

    `,


    "resume.docx": `

        <h3>resume.docx</h3>

        <p>Objective:</p>

        <p>
            Looking for an opportunity to gain
            experience.
        </p>

        <p>Experience:</p>

        <p>
            None yet.
        </p>

    `,


    "Untitled (7).docx": `

        <h3>Untitled (7).docx</h3>

        <p>
            This document contains no text.
        </p>

    `,


    "old stuff": `

        <h3>old stuff</h3>

        <p>
            This folder was not copied.
        </p>

        <p>
            Some files may still exist elsewhere
            on the computer.
        </p>

    `,


    "Essay.docx": `

        <h3>Essay.docx</h3>

        <div class="file-date">
            modified November 12
        </div>

        <p>
            Introduction
        </p>

        <p>
            Technology is something we interact with
            every day...
        </p>

        <p>
            [unfinished]
        </p>

    `,


    "Essay (1).docx": `

        <h3>Essay (1).docx</h3>

        <p>
            This is a duplicate.
        </p>

        <p>
            The document is mostly empty.
        </p>

    `,


    "form.png": `

        <h3>form.png</h3>

        <div class="file-date">
            class reference image
        </div>

        <p>
            Key Concepts
        </p>

        <p>
            A visual reference sheet containing
            important concepts from class.
        </p>

    `

};


// ==========================================================
// IMAGE FILES
// ==========================================================

const imageFiles = {

    "form.png":
        "images/form.png",

    "Screenshot_2024-10-17.png":
        "images/Screenshot_2024-10-17.png",

    "IMG_1002.JPG":
        "images/IMG_1002.JPG",

    "dorm room.jpg":
        "images/dorm-room.jpg"

};


// ==========================================================
// OPEN FILE
// ==========================================================

function openFile(fileName) {

    recordDiscovery(fileName);


    // IMAGE FILE

    if (
        imageFiles[fileName]
    ) {

        openImageFile(
            imageFiles[fileName],
            fileName
        );

        return;

    }


    // EXISTING FILE WINDOW

    const safeName =
        fileName.replace(
            /[^a-zA-Z0-9]/g,
            "-"
        );


    const id =
        "file-" +
        safeName;


    if (
        document.getElementById(id)
    ) {

        return;

    }


    let content =
        fileContents[fileName];


    if (!content) {

        content = `

            <h3>
                ${fileName}
            </h3>

            <div class="file-date">
                Unknown file
            </div>

            <p>
                There doesn't seem to be much here.
            </p>

        `;

    }


    const windowElement =
        createWindow(
            fileName,
            `
                <div class="file-content">
                    ${content}
                </div>
            `,
            "file-window"
        );


    windowElement.id = id;

}


// ==========================================================
// OPEN IMAGE FILE
// ==========================================================

function openImageFile(
    src,
    name
) {

    const existing =
        document.getElementById(
            "image-file-window"
        );


    if (existing) {

        existing.remove();

    }


    const content = `

        <div class="preview-image-content">

            <img
                src="${src}"
                alt="${name}"
                class="large-file-image"
            >

            <div class="image-caption">
                ${name}
            </div>

        </div>

    `;


    const windowElement =
        createWindow(
            name,
            content,
            "image-file-window"
        );


    windowElement.id =
        "image-file-window";

}


// ==========================================================
// DOCK
// ==========================================================

const dockIcons =
    document.querySelectorAll(
        ".dock-icon"
    );


dockIcons.forEach(icon => {

    icon.addEventListener(
        "click",
        () => {

            const dockName =
                icon.dataset.dock;


            switch (dockName) {

                case "finder":
                    openSchool();
                    break;

                case "browser":
                    openBrowser();
                    break;

                case "photos":
                    openPhotos();
                    break;

                case "notes":
                    openNotes();
                    break;

                case "downloads":
                    openDownloads();
                    break;

                case "trash":
                    openTrash();
                    break;

            }

        }
    );

});


// ==========================================================
// ABOUT THIS MAC
// ==========================================================

function openAboutMac() {

    if (
        document.getElementById(
            "about-mac-window"
        )
    ) return;


    const content = `

        <div class="about-mac-content">

            <div class="about-apple">
                
            </div>

            <h2>
                Macintosh
            </h2>

            <p>
                Lost Computer
            </p>

            <p class="about-small">
                Memory: 8 GB
            </p>

            <p class="about-small">
                Storage: 256 GB
            </p>

            <p class="about-small">
                Last backup: May 18
            </p>

        </div>

    `;


    const windowElement =
        createWindow(
            "About This Mac",
            content,
            "about-window"
        );


    windowElement.id =
        "about-mac-window";

}


// ==========================================================
// SYSTEM PREFERENCES
// ==========================================================

function openPreferences() {

    if (
        document.getElementById(
            "preferences-window"
        )
    ) return;


    const content = `

        <div class="preferences-content">

            <h2>
                System Preferences
            </h2>

            <div class="preference-row">
                General
            </div>

            <div class="preference-row">
                Desktop & Dock
            </div>

            <div class="preference-row">
                Displays
            </div>

            <div class="preference-row">
                Battery
            </div>

            <div class="preference-row">
                Privacy & Security
            </div>

        </div>

    `;


    const windowElement =
        createWindow(
            "System Preferences",
            content
        );


    windowElement.id =
        "preferences-window";

}


// ==========================================================
// FORCE QUIT
// ==========================================================

function openForceQuit() {

    if (
        document.getElementById(
            "force-quit-window"
        )
    ) return;


    const content = `

        <div class="force-quit-content">

            <h3>
                Force Quit Applications
            </h3>

            <div class="force-app">
                Finder
            </div>

            <div class="force-app">
                Google Chrome
            </div>

            <div class="force-app">
                Photos
            </div>

            <button class="force-button">
                Cancel
            </button>

        </div>

    `;


    const windowElement =
        createWindow(
            "Force Quit Applications",
            content
        );


    windowElement.id =
        "force-quit-window";


    const cancel =
        windowElement.querySelector(
            ".force-button"
        );


    cancel.addEventListener(
        "click",
        () => {

            windowElement.remove();

        }
    );

}


// ==========================================================
// SYSTEM MESSAGE
// ==========================================================

function setSystemMessage(
    message
) {

    const systemMessage =
        document.getElementById(
            "system-message"
        );


    if (!systemMessage) return;


    systemMessage.textContent =
        message;


    clearTimeout(
        window.systemMessageTimeout
    );


    window.systemMessageTimeout =
        setTimeout(
            () => {

                systemMessage.textContent =
                    "Ready";

            },
            2500
        );

}
