// =================================
// LOST COMPUTER
// =================================


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
// STORY PROGRESS
// =================================

let discoveries =
    JSON.parse(
        localStorage.getItem("lostComputerDiscoveries")
    ) || [];

function recordDiscovery(name) {

    if (!discoveries.includes(name)) {

        discoveries.push(name);

        localStorage.setItem(
            "lostComputerDiscoveries",
            JSON.stringify(discoveries)
        );
    }

    checkArchiveUnlock();
}


// =================================
// ARCHIVE UNLOCK
// =================================

function checkArchiveUnlock() {

    const archive =
        document.getElementById("archive-icon");

    if (!archive) {
        return;
    }

    /*
        The Archive appears after
        the user discovers several
        pieces of the computer.
    */

    if (discoveries.length >= 5) {

        archive.classList.add("visible");

    }
}


// =================================
// DESKTOP ICONS
// =================================

const icons =
    document.querySelectorAll(".desktop-icon");

icons.forEach(icon => {

    icon.addEventListener("dblclick", () => {

        const name =
            icon.dataset.window;

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

        if (name === "archive") {
            openArchive();
        }

    });

});


// =================================
// START MENU
// =================================

const startButton =
    document.getElementById("start-button");

const startMenu =
    document.getElementById("start-menu");

startButton.addEventListener("click", () => {

    startMenu.classList.toggle("visible");

});


// =================================
// CLOSE WINDOW
// =================================

function closeWindow(windowElement) {

    const button =
        windowElement.querySelector(".close-button");

    if (button) {

        button.addEventListener("click", () => {

            windowElement.remove();

        });

    }
}


// =================================
// MAKE WINDOWS DRAGGABLE
// =================================

function makeDraggable(windowElement) {

    const header =
        windowElement.querySelector(".window-header");

    if (!header) {
        return;
    }

    let offsetX = 0;
    let offsetY = 0;

    let dragging = false;


    header.addEventListener("mousedown", event => {

        if (
            event.target.classList.contains(
                "close-button"
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

    });


    document.addEventListener("mousemove", event => {

        if (!dragging) {
            return;
        }

        let newLeft =
            event.clientX - offsetX;

        let newTop =
            event.clientY - offsetY;


        newLeft =
            Math.max(
                0,
                Math.min(
                    newLeft,
                    window.innerWidth -
                    windowElement.offsetWidth
                )
            );


        newTop =
            Math.max(
                0,
                Math.min(
                    newTop,
                    window.innerHeight -
                    windowElement.offsetHeight -
                    42
                )
            );


        windowElement.style.left =
            `${newLeft}px`;

        windowElement.style.top =
            `${newTop}px`;

    });


    document.addEventListener("mouseup", () => {

        dragging = false;

    });

}


// =================================
// ADD WINDOW
// =================================

function addWindow(windowElement) {

    document
        .getElementById("desktop")
        .appendChild(windowElement);

    closeWindow(windowElement);

    makeDraggable(windowElement);

}


// =================================
// DOCUMENTS
// =================================

function openDocuments() {

    if (
        document.getElementById(
            "documents-window"
        )
    ) {
        return;
    }


    recordDiscovery("documents");


    const windowElement =
        document.createElement("div");

    windowElement.id =
        "documents-window";

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

                <div class="file-icon">
                    📄
                </div>

                <span>
                    journal.txt
                </span>

            </div>


            <div class="file">

                <div class="file-icon">
                    📄
                </div>

                <span>
                    schedule.txt
                </span>

            </div>


            <div class="file">

                <div class="file-icon">
                    📄
                </div>

                <span>
                    resume_final.pdf
                </span>

            </div>


            <div class="file">

                <div class="file-icon">
                    📄
                </div>

                <span>
                    apartment_search.doc
                </span>

            </div>


            <div class="file">

                <div class="file-icon">
                    📄
                </div>

                <span>
                    goodbye.txt
                </span>

            </div>

        </div>
    `;


    addWindow(windowElement);

}


// =================================
// PHOTOS
// =================================

function openPhotos() {

    if (
        document.getElementById(
            "photos-window"
        )
    ) {
        return;
    }


    recordDiscovery("photos");


    const windowElement =
        document.createElement("div");


    windowElement.id =
        "photos-window";


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
                    alt="College memory photograph"
                >

                <span>
                    photo1.jpg
                </span>

            </div>


            <div class="photo">

                <img
                    src="images/photo2.JPG"
                    alt="College memory photograph"
                >

                <span>
                    photo2.JPG
                </span>

            </div>


            <div class="photo">

                <img
                    src="images/photo3.JPG"
                    alt="College memory photograph"
                >

                <span>
                    photo3.JPG
                </span>

            </div>


            <div class="photo">

                <img
                    src="images/photo4.JPG"
                    alt="College memory photograph"
                >

                <span>
                    photo4.JPG
                </span>

            </div>

        </div>
    `;


    addWindow(windowElement);


    const photos =
        windowElement.querySelectorAll(
            ".photo img"
        );


    photos.forEach(photo => {

        photo.addEventListener(
            "dblclick",
            () => {

                recordDiscovery(
                    photo.alt
                );

                openPhotoPreview(
                    photo.src,
                    photo.alt
                );

            }
        );

    });

}


// =================================
// PHOTO PREVIEW
// =================================

function openPhotoPreview(
    imageSrc,
    imageAlt
) {

    if (
        document.getElementById(
            "photo-preview"
        )
    ) {
        return;
    }


    const preview =
        document.createElement("div");


    preview.id =
        "photo-preview";


    preview.className =
        "photo-preview";


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
        .getElementById("desktop")
        .appendChild(preview);


    preview
        .querySelector(".close-button")
        .addEventListener("click", () => {

            preview.remove();

        });


    preview.addEventListener(
        "click",
        event => {

            if (
                event.target === preview
            ) {

                preview.remove();

            }

        }
    );

}


// =================================
// DOWNLOADS
// =================================

function openDownloads() {

    if (
        document.getElementById(
            "downloads-window"
        )
    ) {
        return;
    }


    recordDiscovery("downloads");


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

                <div class="file-icon">
                    📄
                </div>

                <span>
                    internship_resume.pdf
                </span>

            </div>


            <div class="file">

                <div class="file-icon">
                    📄
                </div>

                <span>
                    graduation_requirements.pdf
                </span>

            </div>


            <div class="file">

                <div class="file-icon">
                    📄
                </div>

                <span>
                    moving_checklist.txt
                </span>

            </div>


            <div class="file">

                <div class="file-icon">
                    📦
                </div>

                <span>
                    old_photos.zip
                </span>

            </div>


            <div class="file">

                <div class="file-icon">
                    💾
                </div>

                <span>
                    backup_complete.txt
                </span>

            </div>

        </div>
    `;


    addWindow(windowElement);

}


// =================================
// BROWSER
// =================================

function openBrowser() {

    if (
        document.getElementById(
            "browser-window"
        )
    ) {
        return;
    }


    recordDiscovery("browser");


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
                aria-label="Address bar"
            >

            <button class="browser-button">
                ↻
            </button>

        </div>


        <div class="browser-page">

            <h1>
                Browser History
            </h1>

            <p>
                Recent searches from this computer.
            </p>


            <ul class="search-history">


                <li>

                    <div>
                        best coffee near campus
                    </div>

                    <span class="search-date">
                        August 28
                    </span>

                </li>


                <li>

                    <div>
                        how to write a resume
                    </div>

                    <span class="search-date">
                        September 14
                    </span>

                </li>


                <li>

                    <div>
                        photoshop tutorial
                    </div>

                    <span class="search-date">
                        October 2
                    </span>

                </li>


                <li>

                    <div>
                        graduation requirements
                    </div>

                    <span class="search-date">
                        March 19
                    </span>

                </li>


                <li>

                    <div>
                        apartments near downtown
                    </div>

                    <span class="search-date">
                        April 8
                    </span>

                </li>


                <li>

                    <div>
                        jobs for recent graduates
                    </div>

                    <span class="search-date">
                        April 22
                    </span>

                </li>


                <li>

                    <div>
                        how to move out of apartment
                    </div>

                    <span class="search-date">
                        May 3
                    </span>

                </li>


                <li>

                    <div>
                        transfer files to new laptop
                    </div>

                    <span class="search-date">
                        May 17
                    </span>

                </li>


                <li>

                    <div>
                        factory reset laptop
                    </div>

                    <span class="search-date">
                        May 18
                    </span>

                </li>


            </ul>

        </div>
    `;


    addWindow(windowElement);

}


// =================================
// NOTES
// =================================

function openNotes() {

    if (
        document.getElementById(
            "notes-window"
        )
    ) {
        return;
    }


    recordDiscovery("notes");


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

                <span>
                    1
                </span>

                <p>
                    Buy toothpaste
                </p>

            </div>


            <div class="note-line">

                <span>
                    2
                </span>

                <p>
                    Email professor about final grade
                </p>

            </div>


            <div class="note-line">

                <span>
                    3
                </span>

                <p>
                    Return library books
                </p>

            </div>


            <div class="note-line">

                <span>
                    4
                </span>

                <p>
                    Pick up boxes
                </p>

            </div>


            <div class="note-line">

                <span>
                    5
                </span>

                <p>
                    Cancel apartment utilities
                </p>

            </div>


            <div class="note-line">

                <span>
                    6
                </span>

                <p>
                    Take everything from fridge
                </p>

            </div>


            <div class="note-line">

                <span>
                    7
                </span>

                <p>
                    Don't forget the laptop
                </p>

            </div>


            <div class="note-line">

                <span>
                    8
                </span>

                <p>
                    I can't believe I'm actually leaving.
                </p>

            </div>

        </div>
    `;


    addWindow(windowElement);

}


// =================================
// TRASH
// =================================

function openTrash() {

    if (
        document.getElementById(
            "trash-window"
        )
    ) {
        return;
    }


    recordDiscovery("trash");


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

                <div class="file-icon">
                    🖼️
                </div>

                <span>
                    dorm_room_old.jpg
                </span>

            </div>


            <div class="file">

                <div class="file-icon">
                    📄
                </div>

                <span>
                    old_schedule.txt
                </span>

            </div>


            <div class="file">

                <div class="file-icon">
                    📄
                </div>

                <span>
                    first_resume.doc
                </span>

            </div>


            <div class="file">

                <div class="file-icon">
                    📄
                </div>

                <span>
                    moving_day.txt
                </span>

            </div>

        </div>
    `;


    addWindow(windowElement);

}


// =================================
// ARCHIVE
// =================================

function openArchive() {

    if (
        document.getElementById(
            "archive-window"
        )
    ) {
        return;
    }


    recordDiscovery("archive");


    const windowElement =
        document.createElement("div");


    windowElement.id =
        "archive-window";


    windowElement.className =
        "computer-window";


    windowElement.innerHTML = `

        <div class="window-header">

            Archive

            <button class="close-button">
                ×
            </button>

        </div>


        <div class="archive-warning">

            These files have not been opened in a long time.

        </div>


        <div class="window-content">


            <div class="file">

                <div class="file-icon">
                    📄
                </div>

                <span>
                    freshman_year.txt
                </span>

            </div>


            <div class="file">

                <div class="file-icon">
                    📄
                </div>

                <span>
                    sophomore_year.txt
                </span>

            </div>


            <div class="file">

                <div class="file-icon">
                    📄
                </div>

                <span>
                    junior_year.txt
                </span>

            </div>


            <div class="file">

                <div class="file-icon">
                    📄
                </div>

                <span>
                    goodbye.txt
                </span>

            </div>

        </div>
    `;


    addWindow(windowElement);

}


// =================================
// FILE OPENING
// =================================

document.addEventListener(
    "dblclick",
    event => {

        const file =
            event.target.closest(".file");


        if (!file) {
            return;
        }


        const nameElement =
            file.querySelector("span");


        if (!nameElement) {
            return;
        }


        const fileName =
            nameElement.textContent.trim();


        openFile(fileName);

    }
);


// =================================
// FILE CONTENT
// =================================

function openFile(fileName) {

    const id =
        "file-" +
        fileName
            .replace(/[^a-zA-Z0-9]/g, "-");


    if (
        document.getElementById(id)
    ) {
        return;
    }


    recordDiscovery(fileName);


    let content = "";


    // -----------------------------
    // JOURNAL
    // -----------------------------

    if (fileName === "journal.txt") {

        content = `

            <h3>journal.txt</h3>

            <div class="file-date">
                Last modified: May 14
            </div>

            <p>
                I really need to clean this thing out.
            </p>

            <p>
                Four years of files and I still have
                screenshots from freshman year.
            </p>

            <p>
                I don't even remember why I kept
                half of this stuff.
            </p>

            <p>
                Maybe that's the problem.
            </p>

        `;

    }


    // -----------------------------
    // SCHEDULE
    // -----------------------------

    if (fileName === "schedule.txt") {

        content = `

            <h3>schedule.txt</h3>

            <p>
                Monday — Class
            </p>

            <p>
                Tuesday — Work
            </p>

            <p>
                Wednesday — Class
            </p>

            <p>
                Thursday — Work
            </p>

            <p>
                Friday — Last day
            </p>

            <br>

            <p>
                Graduation: Saturday
            </p>

        `;

    }


    // -----------------------------
    // RESUME
    // -----------------------------

    if (
        fileName === "resume_final.pdf"
    ) {

        content = `

            <h3>resume_final.pdf</h3>

            <div class="file-date">
                Created during senior year
            </div>

            <p>
                EDUCATION
            </p>

            <p>
                Bachelor of Arts
            </p>

            <p>
                EXPERIENCE
            </p>

            <p>
                Student Assistant
            </p>

            <p>
                Design Intern
            </p>

            <p>
                SKILLS
            </p>

            <p>
                Adobe Creative Cloud
            </p>

            <p>
                HTML / CSS
            </p>

            <p>
                Communication
            </p>

        `;

    }


    // -----------------------------
    // APARTMENT
    // -----------------------------

    if (
        fileName === "apartment_search.doc"
    ) {

        content = `

            <h3>apartment_search.doc</h3>

            <p>
                Places to look:
            </p>

            <p>
                1. Downtown
            </p>

            <p>
                2. Near work
            </p>

            <p>
                3. Somewhere with a balcony
            </p>

            <p>
                Notes:
            </p>

            <p>
                Need to figure out what to take.
            </p>

            <p>
                I don't need everything anymore.
            </p>

        `;

    }


    // -----------------------------
    // GOODBYE
    // -----------------------------

    if (
        fileName === "goodbye.txt"
    ) {

        content = `

            <h3>goodbye.txt</h3>

            <div class="file-date">
                Last modified: May 18
            </div>

            <p>
                This computer has been with me
                through everything.
            </p>

            <p>
                First semester.
                First apartment.
                First terrible all-nighter.
                First real job.
            </p>

            <p>
                There are probably things on here
                I haven't looked at in years.
            </p>

            <p>
                I think I'm ready to let it go.
            </p>

            <p>
                Everything important has been backed up.
            </p>

            <p>
                Tomorrow I'll reset it.
            </p>

            <p>
                I guess this is goodbye.
            </p>

        `;

    }


    // -----------------------------
    // MOVING CHECKLIST
    // -----------------------------

    if (
        fileName === "moving_checklist.txt"
    ) {

        content = `

            <h3>moving_checklist.txt</h3>

            <p>
                [x] Pack clothes
            </p>

            <p>
                [x] Return keys
            </p>

            <p>
                [x] Donate furniture
            </p>

            <p>
                [x] Back up laptop
            </p>

            <p>
                [x] Clean apartment
            </p>

            <p>
                [ ] Say goodbye
            </p>

        `;

    }


    // -----------------------------
    // BACKUP
    // -----------------------------

    if (
        fileName === "backup_complete.txt"
    ) {

        content = `

            <h3>backup_complete.txt</h3>

            <p>
                Backup completed successfully.
            </p>

            <p>
                Photos: backed up
            </p>

            <p>
                Documents: backed up
            </p>

            <p>
                Music: backed up
            </p>

            <p>
                Personal files: backed up
            </p>

            <br>

            <p>
                The computer can now be reset.
            </p>

        `;

    }


    // -----------------------------
    // FRESHMAN YEAR
    // -----------------------------

    if (
        fileName === "freshman_year.txt"
    ) {

        content = `

            <h3>freshman_year.txt</h3>

            <p>
                I thought college would feel different.
            </p>

            <p>
                I was nervous about everything.
            </p>

            <p>
                I didn't know anyone.
            </p>

            <p>
                Somehow by the end of the year,
                this place already felt normal.
            </p>

        `;

    }


    // -----------------------------
    // SOPHOMORE YEAR
    // -----------------------------

    if (
        fileName === "sophomore_year.txt"
    ) {

        content = `

            <h3>sophomore_year.txt</h3>

            <p>
                I finally stopped feeling like
                I was pretending to be a college student.
            </p>

            <p>
                I had friends.
            </p>

            <p>
                I knew where everything was.
            </p>

            <p>
                I liked my life here.
            </p>

        `;

    }


    // -----------------------------
    // JUNIOR YEAR
    // -----------------------------

    if (
        fileName === "junior_year.txt"
    ) {

        content = `

            <h3>junior_year.txt</h3>

            <p>
                Everything got busy.
            </p>

            <p>
                Classes.
                Work.
                Applications.
                Late nights.
            </p>

            <p>
                I keep telling myself
                I'll slow down after graduation.
            </p>

        `;

    }


    // -----------------------------
    // READ ME
    // -----------------------------

    if (
        fileName === "read_me.txt"
    ) {

        content = `

            <h3>read_me.txt</h3>

            <p>
                If you're reading this,
                you probably found the computer
                after I left it.
            </p>

            <p>
                Everything important was backed up.
            </p>

            <p>
                You can look around.
            </p>

            <p>
                I don't mind.
            </p>

        `;

    }


    // -----------------------------
    // OLD PHOTOS
    // -----------------------------

    if (
        fileName === "old_photos.zip"
    ) {

        content = `

            <h3>old_photos.zip</h3>

            <p>
                Archive contains:
            </p>

            <p>
                847 photographs
            </p>

            <p>
                31 screenshots
            </p>

            <p>
                4 videos
            </p>

            <p>
                Last opened:
                2 years ago
            </p>

        `;

    }


    // -----------------------------
    // TRASH FILES
    // -----------------------------

    if (
        fileName === "dorm_room_old.jpg"
    ) {

        content = `

            <h3>dorm_room_old.jpg</h3>

            <p>
                Deleted photograph.
            </p>

            <p>
                The file cannot be restored.
            </p>

        `;

    }


    if (
        fileName === "old_schedule.txt"
    ) {

        content = `

            <h3>old_schedule.txt</h3>

            <p>
                Monday — Biology
            </p>

            <p>
                Tuesday — Studio
            </p>

            <p>
                Wednesday — Biology
            </p>

            <p>
                Thursday — Studio
            </p>

            <p>
                Friday — Free
            </p>

            <br>

            <p>
                Semester 1
            </p>

        `;

    }


    if (
        fileName === "first_resume.doc"
    ) {

        content = `

            <h3>first_resume.doc</h3>

            <p>
                Objective:
            </p>

            <p>
                "Looking for my first job."
            </p>

            <p>
                Experience:
            </p>

            <p>
                None yet.
            </p>

        `;

    }


    if (
        fileName === "moving_day.txt"
    ) {

        content = `

            <h3>moving_day.txt</h3>

            <p>
                6:00 AM — Wake up
            </p>

            <p>
                7:00 AM — Load car
            </p>

            <p>
                9:00 AM — Clean room
            </p>

            <p>
                11:00 AM — Return keys
            </p>

            <p>
                12:00 PM — Leave
            </p>

        `;

    }


    // -----------------------------
    // DEFAULT
    // -----------------------------

    if (content === "") {

        content = `

            <h3>${fileName}</h3>

            <p>
                This file appears to be empty.
            </p>

        `;

    }


    // -----------------------------
    // CREATE WINDOW
    // -----------------------------

    const windowElement =
        document.createElement("div");


    windowElement.id =
        id;


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


    addWindow(windowElement);

}


// =================================
// RESET WARNING
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


    addWindow(windowElement);


    windowElement
        .querySelector(".warning-button")
        .addEventListener(
            "click",
            () => {

                windowElement.remove();

            }
        );

}


// =================================
// DOUBLE CLICK SPECIAL FILES
// =================================

document.addEventListener(
    "dblclick",
    event => {

        const file =
            event.target.closest(".file");


        if (!file) {
            return;
        }


        const nameElement =
            file.querySelector("span");


        if (!nameElement) {
            return;
        }


        const fileName =
            nameElement.textContent.trim();


        if (
            fileName === "unknown_file.exe"
        ) {

            openUnknownFile();

        }

    }
);


// =================================
// INITIAL ARCHIVE CHECK
// =================================

checkArchiveUnlock();
