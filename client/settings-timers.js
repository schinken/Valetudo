/*global ons, fn*/
var loadingBarSettingsTimers = document.getElementById("loading-bar-settings-timers");
var timersSettingsTimersList = document.getElementById("settings-timers-timer-list");
var dndTimerList = document.getElementById("settings-dnd-timer-list");

ons.getScriptPage().onShow = function() {
    updateSettingsTimersPage();
    updateDndTimerPage();
};

// eslint-disable-next-line no-unused-vars
function showTimeZoneDialog() {
    loadingBarSettingsTimers.setAttribute("indeterminate", "indeterminate");
    fn.request("api/get_timezone", "GET", function(err, currentTimeZone) {
        loadingBarSettingsTimers.removeAttribute("indeterminate");
        if (!err) {
            var timeZoneSelection = document.getElementById("timezone-selection");
            if (timeZoneSelection.childElementCount === 0) {
                // initialize select options only if not already done
                // TODO: Those timezones should be outsourced to a config file
                var allTimezones = [
                    "Africa/Abidjan",
                    "Africa/Accra",
                    "Africa/Algiers",
                    "Africa/Bissau",
                    "Africa/Cairo",
                    "Africa/Casablanca",
                    "Africa/Ceuta",
                    "Africa/El_Aaiun",
                    "Africa/Johannesburg",
                    "Africa/Juba",
                    "Africa/Khartoum",
                    "Africa/Lagos",
                    "Africa/Maputo",
                    "Africa/Monrovia",
                    "Africa/Nairobi",
                    "Africa/Ndjamena",
                    "Africa/Sao_Tome",
                    "Africa/Tripoli",
                    "Africa/Tunis",
                    "Africa/Windhoek",
                    "America/Adak",
                    "America/Anchorage",
                    "America/Araguaina",
                    "America/Argentina/Buenos_Aires",
                    "America/Argentina/Catamarca",
                    "America/Argentina/Cordoba",
                    "America/Argentina/Jujuy",
                    "America/Argentina/La_Rioja",
                    "America/Argentina/Mendoza",
                    "America/Argentina/Rio_Gallegos",
                    "America/Argentina/Salta",
                    "America/Argentina/San_Juan",
                    "America/Argentina/San_Luis",
                    "America/Argentina/Tucuman",
                    "America/Argentina/Ushuaia",
                    "America/Asuncion",
                    "America/Atikokan",
                    "America/Bahia",
                    "America/Bahia_Banderas",
                    "America/Barbados",
                    "America/Belem",
                    "America/Belize",
                    "America/Blanc-Sablon",
                    "America/Boa_Vista",
                    "America/Bogota",
                    "America/Boise",
                    "America/Cambridge_Bay",
                    "America/Campo_Grande",
                    "America/Cancun",
                    "America/Caracas",
                    "America/Cayenne",
                    "America/Chicago",
                    "America/Chihuahua",
                    "America/Costa_Rica",
                    "America/Creston",
                    "America/Cuiaba",
                    "America/Curacao",
                    "America/Danmarkshavn",
                    "America/Dawson",
                    "America/Dawson_Creek",
                    "America/Denver",
                    "America/Detroit",
                    "America/Edmonton",
                    "America/Eirunepe",
                    "America/El_Salvador",
                    "America/Fortaleza",
                    "America/Fort_Nelson",
                    "America/Glace_Bay",
                    "America/Godthab",
                    "America/Goose_Bay",
                    "America/Grand_Turk",
                    "America/Guatemala",
                    "America/Guayaquil",
                    "America/Guyana",
                    "America/Halifax",
                    "America/Havana",
                    "America/Hermosillo",
                    "America/Indiana/Indianapolis",
                    "America/Indiana/Knox",
                    "America/Indiana/Marengo",
                    "America/Indiana/Petersburg",
                    "America/Indiana/Tell_City",
                    "America/Indiana/Vevay",
                    "America/Indiana/Vincennes",
                    "America/Indiana/Winamac",
                    "America/Inuvik",
                    "America/Iqaluit",
                    "America/Jamaica",
                    "America/Juneau",
                    "America/Kentucky/Louisville",
                    "America/Kentucky/Monticello",
                    "America/La_Paz",
                    "America/Lima",
                    "America/Los_Angeles",
                    "America/Maceio",
                    "America/Managua",
                    "America/Manaus",
                    "America/Martinique",
                    "America/Matamoros",
                    "America/Mazatlan",
                    "America/Menominee",
                    "America/Merida",
                    "America/Metlakatla",
                    "America/Mexico_City",
                    "America/Miquelon",
                    "America/Moncton",
                    "America/Monterrey",
                    "America/Montevideo",
                    "America/Nassau",
                    "America/New_York",
                    "America/Nipigon",
                    "America/Nome",
                    "America/Noronha",
                    "America/North_Dakota/Beulah",
                    "America/North_Dakota/Center",
                    "America/North_Dakota/New_Salem",
                    "America/Ojinaga",
                    "America/Panama",
                    "America/Pangnirtung",
                    "America/Paramaribo",
                    "America/Phoenix",
                    "America/Port-au-Prince",
                    "America/Porto_Velho",
                    "America/Port_of_Spain",
                    "America/Puerto_Rico",
                    "America/Punta_Arenas",
                    "America/Rainy_River",
                    "America/Rankin_Inlet",
                    "America/Recife",
                    "America/Regina",
                    "America/Resolute",
                    "America/Rio_Branco",
                    "America/Santarem",
                    "America/Santiago",
                    "America/Santo_Domingo",
                    "America/Sao_Paulo",
                    "America/Scoresbysund",
                    "America/Sitka",
                    "America/St_Johns",
                    "America/Swift_Current",
                    "America/Tegucigalpa",
                    "America/Thule",
                    "America/Thunder_Bay",
                    "America/Tijuana",
                    "America/Toronto",
                    "America/Vancouver",
                    "America/Whitehorse",
                    "America/Winnipeg",
                    "America/Yakutat",
                    "America/Yellowknife",
                    "Antarctica/Casey",
                    "Antarctica/Davis",
                    "Antarctica/DumontDUrville",
                    "Antarctica/Macquarie",
                    "Antarctica/Mawson",
                    "Antarctica/Palmer",
                    "Antarctica/Rothera",
                    "Antarctica/Syowa",
                    "Antarctica/Troll",
                    "Antarctica/Vostok",
                    "Asia/Almaty",
                    "Asia/Amman",
                    "Asia/Anadyr",
                    "Asia/Aqtau",
                    "Asia/Aqtobe",
                    "Asia/Ashgabat",
                    "Asia/Atyrau",
                    "Asia/Baghdad",
                    "Asia/Baku",
                    "Asia/Bangkok",
                    "Asia/Barnaul",
                    "Asia/Beirut",
                    "Asia/Bishkek",
                    "Asia/Brunei",
                    "Asia/Chita",
                    "Asia/Choibalsan",
                    "Asia/Colombo",
                    "Asia/Damascus",
                    "Asia/Dhaka",
                    "Asia/Dili",
                    "Asia/Dubai",
                    "Asia/Dushanbe",
                    "Asia/Famagusta",
                    "Asia/Gaza",
                    "Asia/Hebron",
                    "Asia/Hong_Kong",
                    "Asia/Hovd",
                    "Asia/Ho_Chi_Minh",
                    "Asia/Irkutsk",
                    "Asia/Jakarta",
                    "Asia/Jayapura",
                    "Asia/Jerusalem",
                    "Asia/Kabul",
                    "Asia/Kamchatka",
                    "Asia/Karachi",
                    "Asia/Kathmandu",
                    "Asia/Khandyga",
                    "Asia/Kolkata",
                    "Asia/Krasnoyarsk",
                    "Asia/Kuala_Lumpur",
                    "Asia/Kuching",
                    "Asia/Macau",
                    "Asia/Magadan",
                    "Asia/Makassar",
                    "Asia/Manila",
                    "Asia/Nicosia",
                    "Asia/Novokuznetsk",
                    "Asia/Novosibirsk",
                    "Asia/Omsk",
                    "Asia/Oral",
                    "Asia/Pontianak",
                    "Asia/Pyongyang",
                    "Asia/Qatar",
                    "Asia/Qostanay",
                    "Asia/Qyzylorda",
                    "Asia/Riyadh",
                    "Asia/Sakhalin",
                    "Asia/Samarkand",
                    "Asia/Seoul",
                    "Asia/Shanghai",
                    "Asia/Singapore",
                    "Asia/Srednekolymsk",
                    "Asia/Taipei",
                    "Asia/Tashkent",
                    "Asia/Tbilisi",
                    "Asia/Tehran",
                    "Asia/Thimphu",
                    "Asia/Tokyo",
                    "Asia/Tomsk",
                    "Asia/Ulaanbaatar",
                    "Asia/Urumqi",
                    "Asia/Ust-Nera",
                    "Asia/Vladivostok",
                    "Asia/Yakutsk",
                    "Asia/Yangon",
                    "Asia/Yekaterinburg",
                    "Asia/Yerevan",
                    "Atlantic/Azores",
                    "Atlantic/Bermuda",
                    "Atlantic/Canary",
                    "Atlantic/Cape_Verde",
                    "Atlantic/Faroe",
                    "Atlantic/Madeira",
                    "Atlantic/Reykjavik",
                    "Atlantic/South_Georgia",
                    "Atlantic/Stanley",
                    "Australia/Adelaide",
                    "Australia/Brisbane",
                    "Australia/Broken_Hill",
                    "Australia/Currie",
                    "Australia/Darwin",
                    "Australia/Eucla",
                    "Australia/Hobart",
                    "Australia/Lindeman",
                    "Australia/Lord_Howe",
                    "Australia/Melbourne",
                    "Australia/Perth",
                    "Australia/Sydney",
                    "Europe/Amsterdam",
                    "Europe/Andorra",
                    "Europe/Astrakhan",
                    "Europe/Athens",
                    "Europe/Belgrade",
                    "Europe/Berlin",
                    "Europe/Brussels",
                    "Europe/Bucharest",
                    "Europe/Budapest",
                    "Europe/Chisinau",
                    "Europe/Copenhagen",
                    "Europe/Dublin",
                    "Europe/Gibraltar",
                    "Europe/Helsinki",
                    "Europe/Istanbul",
                    "Europe/Kaliningrad",
                    "Europe/Kiev",
                    "Europe/Kirov",
                    "Europe/Lisbon",
                    "Europe/London",
                    "Europe/Luxembourg",
                    "Europe/Madrid",
                    "Europe/Malta",
                    "Europe/Minsk",
                    "Europe/Monaco",
                    "Europe/Moscow",
                    "Europe/Oslo",
                    "Europe/Paris",
                    "Europe/Prague",
                    "Europe/Riga",
                    "Europe/Rome",
                    "Europe/Samara",
                    "Europe/Saratov",
                    "Europe/Simferopol",
                    "Europe/Sofia",
                    "Europe/Stockholm",
                    "Europe/Tallinn",
                    "Europe/Tirane",
                    "Europe/Ulyanovsk",
                    "Europe/Uzhgorod",
                    "Europe/Vienna",
                    "Europe/Vilnius",
                    "Europe/Volgograd",
                    "Europe/Warsaw",
                    "Europe/Zaporozhye",
                    "Europe/Zurich",
                    "Indian/Chagos",
                    "Indian/Christmas",
                    "Indian/Cocos",
                    "Indian/Kerguelen",
                    "Indian/Mahe",
                    "Indian/Maldives",
                    "Indian/Mauritius",
                    "Indian/Reunion",
                    "Pacific/Apia",
                    "Pacific/Auckland",
                    "Pacific/Bougainville",
                    "Pacific/Chatham",
                    "Pacific/Chuuk",
                    "Pacific/Easter",
                    "Pacific/Efate",
                    "Pacific/Enderbury",
                    "Pacific/Fakaofo",
                    "Pacific/Fiji",
                    "Pacific/Funafuti",
                    "Pacific/Galapagos",
                    "Pacific/Gambier",
                    "Pacific/Guadalcanal",
                    "Pacific/Guam",
                    "Pacific/Honolulu",
                    "Pacific/Kiritimati",
                    "Pacific/Kosrae",
                    "Pacific/Kwajalein",
                    "Pacific/Majuro",
                    "Pacific/Marquesas",
                    "Pacific/Nauru",
                    "Pacific/Niue",
                    "Pacific/Norfolk",
                    "Pacific/Noumea",
                    "Pacific/Pago_Pago",
                    "Pacific/Palau",
                    "Pacific/Pitcairn",
                    "Pacific/Pohnpei",
                    "Pacific/Port_Moresby",
                    "Pacific/Rarotonga",
                    "Pacific/Tahiti",
                    "Pacific/Tarawa",
                    "Pacific/Tongatapu",
                    "Pacific/Wake",
                    "Pacific/Wallis"
                ];
                allTimezones.forEach(function(tmpTimeZone) {
                    var tmpOption = document.createElement("option");
                    tmpOption.innerText = tmpTimeZone;
                    tmpOption.value = tmpTimeZone;
                    if (tmpTimeZone === currentTimeZone) {
                        tmpOption.selected = true;
                    }
                    timeZoneSelection.appendChild(tmpOption);
                });
            } else {
                // adjust selection to match server side setting
                for (var i = 0; i < timeZoneSelection.options.length; i++) {
                    let tmpOption = timeZoneSelection.options[i];
                    if (tmpOption.value === currentTimeZone) {
                        tmpOption.selected = true;
                    } else {
                        tmpOption.selected = false;
                    }
                }
            }
            document.getElementById("edit-timezone-dialog").show();
        } else {
            ons.notification.toast(err,
                {buttonLabel: "Dismiss", timeout: window.fn.toastErrorTimeout});
        }
    });
}

function hideTimeZoneDialog() {
    document.getElementById("edit-timezone-dialog").hide();
}

// eslint-disable-next-line no-unused-vars
function saveTimeZone() {
    var timeZoneSelection = document.getElementById("timezone-selection");
    var newTimezone = timeZoneSelection.options[timeZoneSelection.selectedIndex].value;

    ons.notification.confirm("Do you really want to set your timezone to \"" + newTimezone + "\"?")
        .then(function(answer) {
            if (answer === 1) {
                loadingBarSettingsTimers.setAttribute("indeterminate", "indeterminate");
                fn.requestWithPayload(
                    "api/set_timezone", JSON.stringify({new_zone: newTimezone}), "POST",
                    function(err, res) {
                        loadingBarSettingsTimers.removeAttribute("indeterminate");
                        if (err) {
                            ons.notification.toast(
                                err,
                                {buttonLabel: "Dismiss", timeout: window.fn.toastErrorTimeout});
                        } else {
                            hideTimeZoneDialog();
                        }
                    });
            }
        });
}

// eslint-disable-next-line no-unused-vars
var showDndTimerDialog = function(startHour, startMinute, endHour, endMinute) {
    document.getElementById("edit-dnd-form").start_hour.value = (startHour >= 0 ? startHour : "");
    document.getElementById("edit-dnd-form").start_minute.value =
        (startMinute >= 0 ? startMinute : "");
    document.getElementById("edit-dnd-form").end_hour.value = (endHour >= 0 ? endHour : "");
    document.getElementById("edit-dnd-form").end_minute.value = (endMinute >= 0 ? endMinute : "");
    document.getElementById("edit-dnd-timer-dialog").show();
};

var hideDndTimerDialog = function() {
    document.getElementById("edit-dnd-timer-dialog").hide();
};

// TODO: There should be some util to convert numbers to leading zero numbers
function asTwoDigitNumber(number) {
    if (number < 10)
        return "0" + number;
    else
        return number;
}

function updateDndTimerPage() {
    loadingBarSettingsTimers.setAttribute("indeterminate", "indeterminate");
    while (dndTimerList.lastChild) {
        dndTimerList.removeChild(dndTimerList.lastChild);
    }
    fn.request("api/get_dnd", "GET", function(err, res) {
        loadingBarSettingsTimers.removeAttribute("indeterminate");
        if (!err) {
            // TODO: Check if multiple dnd timers can be created!
            if (res.length == 0 || res[0].enabled == 0) {
                // no timer is enabled yet, show possibility to add dnd timer
                dndTimerList.appendChild(ons.createElement(
                    "<ons-list-item>\n" +
                    "    <div class='left'>There is no DND timer enabled yet.</div>" +
                    "    <div class='right'>" +
                    "        <ons-button modifier='quiet' class='button-margin' style='font-size: 2em;' onclick='showDndTimerDialog(-1, -1, -1, -1);'>" +
                    "            <ons-icon icon='fa-edit'></ons-icon>" +
                    "        </ons-button>" +
                    "    </div>" +
                    "</ons-list-item>"));
            } else {
                // Show current active timer
                res.forEach(function(dndTimer) {
                    dndTimerList.appendChild(ons.createElement(
                        "<ons-list-item>\n" +
                        "    <div class='left'>DND will start at " + dndTimer.start_hour + ":" +
                        asTwoDigitNumber(dndTimer.start_minute) + " and end on " +
                        dndTimer.end_hour + ":" + asTwoDigitNumber(dndTimer.end_minute) + "</div>" +
                        "    <div class='right'>" +
                        "        <ons-button modifier='quiet' class='button-margin' style='font-size: 2em;' onclick='showDndTimerDialog(" +
                        dndTimer.start_hour + ", " + dndTimer.start_minute + ", " +
                        dndTimer.end_hour + ", " + dndTimer.end_minute + ");'>" +
                        "            <ons-icon icon='fa-edit'></ons-icon>" +
                        "        </ons-button>" +
                        "        <ons-button modifier='quiet' class='button-margin' style='font-size: 2em;' onclick='deleteDndTimer();'>" +
                        "            <ons-icon icon='fa-trash'></ons-icon>" +
                        "        </ons-button>" +
                        "    </div>" +
                        "</ons-list-item>"));
                });
            }
        } else {
            ons.notification.toast(err,
                {buttonLabel: "Dismiss", timeout: window.fn.toastErrorTimeout});
        }
    });
}

// eslint-disable-next-line no-unused-vars
function deleteDndTimer() {
    ons.notification.confirm("Do you really want to disable DND?").then(function(answer) {
        if (answer === 1) {
            loadingBarSettingsTimers.setAttribute("indeterminate", "indeterminate");
            fn.request("api/delete_dnd", "PUT", function(err) {
                loadingBarSettingsTimers.removeAttribute("indeterminate");
                if (err) {
                    ons.notification.toast(
                        err, {buttonLabel: "Dismiss", timeout: window.fn.toastErrorTimeout});
                } else {
                    updateDndTimerPage();
                }
            });
        }
    });
}

// eslint-disable-next-line no-unused-vars
function saveDndTimer() {
    var start_hour = document.getElementById("edit-dnd-form").start_hour.value;
    var start_minute = document.getElementById("edit-dnd-form").start_minute.value;
    var end_hour = document.getElementById("edit-dnd-form").end_hour.value;
    var end_minute = document.getElementById("edit-dnd-form").end_minute.value;
    if (start_hour && start_minute && end_hour && end_minute) {
        fn.requestWithPayload(
            "api/set_dnd", JSON.stringify({start_hour, start_minute, end_hour, end_minute}), "POST",
            function(err, res) {
                if (err) {
                    ons.notification.toast(
                        err, {buttonLabel: "Dismiss", timeout: window.fn.toastErrorTimeout});
                }
                hideDndTimerDialog();
                updateDndTimerPage();
            });
    } else {
        ons.notification.toast(
            "Could not save DND Timer since not all required attributes are provided!",
            {buttonLabel: "Dismiss", timeout: window.fn.toastErrorTimeout});
    }
}

function updateSettingsTimersPage() {
    loadingBarSettingsTimers.setAttribute("indeterminate", "indeterminate");
    while (timersSettingsTimersList.lastChild) {
        timersSettingsTimersList.removeChild(timersSettingsTimersList.lastChild);
    }

    fn.request("api/timers", "GET", function(err, res) {
        loadingBarSettingsTimers.removeAttribute("indeterminate");
        if (!err) {
            if (res == null || res.length == 0) {
                timersSettingsTimersList.appendChild(ons.createElement(
                    "<ons-list-item>\n" +
                    "    <div class='center'>There is no timer configured yet.</div>" +
                    "</ons-list-item>"));
            }

            res.forEach(function(timer) {
                // ADD EDIT (equals create new + delete!)
                var elem = ons.createElement(
                    "<ons-list-item data-id='" + timer.id + "'>\n" +
                    "    <div class='left'>" + timer.human_desc + " (" + timer.cron + ")</div>" +
                    "    <div class='right'>" +
                    "        <ons-switch class='timer-active-switch'" +
                    (timer.enabled ? " checked='checked' " : "") + "></ons-switch> " +
                    "        <ons-button modifier='quiet' class='button-margin timer-delete'>" +
                    "            <ons-icon icon='fa-trash'></ons-icon>" +
                    "        </ons-button>" +
                    "    </div>" +
                    "</ons-list-item>");

                elem.querySelector(".timer-active-switch")
                    .addEventListener("change",
                        function(event) {
                            toggleTimer(timer.id, event.value);
                        });

                elem.querySelector(".timer-delete")
                    .addEventListener("click", function(event) {
                        deleteTimer(timer.id);
                    });

                timersSettingsTimersList.appendChild(elem);
            });
        } else {
            ons.notification.toast(err,
                {buttonLabel: "Dismiss", timeout: window.fn.toastErrorTimeout});
        }
    });
}

function toggleTimer(id, enabled) {
    disableTimerInputElements();
    loadingBarSettingsTimers.setAttribute("indeterminate", "indeterminate");

    fn.requestWithPayload(
        "api/timers/" + id, JSON.stringify({enabled: enabled}), "PUT", function(err, res) {
            if (err) {
                ons.notification.toast(
                    err, {buttonLabel: "Dismiss", timeout: window.fn.toastErrorTimeout});
            }
            window.setTimeout(function() {
                updateSettingsTimersPage();
            }, 350);
        });
}

function disableTimerInputElements() {
    timersSettingsTimersList.querySelectorAll(".timer-active-switch")
        .forEach(function(elem) {
            elem.setAttribute("disabled", "disabled");
        });
    timersSettingsTimersList.querySelectorAll(".timer-delete")
        .forEach(function(elem) {
            elem.setAttribute("disabled", "disabled");
        });
}

function enableTimerInputElements() {
    timersSettingsTimersList.querySelectorAll(".timer-active-switch")
        .forEach(function(elem) {
            elem.removeAttribute("disabled");
        });
    timersSettingsTimersList.querySelectorAll(".timer-delete")
        .forEach(function(elem) {
            elem.removeAttribute("disabled");
        });
}

function deleteTimer(id) {
    disableTimerInputElements();
    ons.notification.confirm("Do you really want to delete this timer?").then(function(answer) {
        if (answer === 1) {
            loadingBarSettingsTimers.setAttribute("indeterminate", "indeterminate");

            fn.request("api/timers/" + id, "DELETE", function(err, res) {
                if (err) {
                    ons.notification.toast(
                        err, {buttonLabel: "Dismiss", timeout: window.fn.toastErrorTimeout});
                }

                updateSettingsTimersPage();
            });
        } else {
            enableTimerInputElements();
        }
    });
}

function clearNewTimerDialog() {
    document.getElementById("add-timer-form").month.value = "";
    document.getElementById("add-timer-form").day.value = "";
    document.getElementById("add-timer-form").hour.value = "";
    document.getElementById("add-timer-form").minute.value = "";
    var daysRunner;
    for (daysRunner = 0; daysRunner < document.getElementById("add-timer-form").days.length;
        daysRunner++) {
        document.getElementById("add-timer-form").days[daysRunner].checked = false;
    }
}

// eslint-disable-next-line no-unused-vars
function addNewTimer() {
    // get and validate selected month
    var monthValue = document.getElementById("add-timer-form").month.value;
    if (monthValue === "") {
        monthValue = "*";
    } else {
        // verify limits of month
        var monthNumber = parseInt(monthValue) || 0;
        if (monthNumber < 1) {
            monthValue = 1;
        } else if (monthNumber > 12) {
            monthValue = 12;
        }
    }
    // get and validate selected day
    var dayValue = document.getElementById("add-timer-form").day.value;
    if (dayValue === "") {
        dayValue = "*";
    } else {
        // verify limits of day
        var dayNumber = parseInt(dayValue) || 0;
        if (dayNumber < 1) {
            dayValue = 1;
        } else if (dayNumber > 31) {
            dayValue = 31;
        }
    }
    // get and validate selected hour
    var hoursValue = document.getElementById("add-timer-form").hour.value;
    if (hoursValue === "") {
        hoursValue = "*";
    } else {
        // verify limits of hour
        var hoursNumber = parseInt(hoursValue) || 0;
        if (hoursNumber < 0) {
            hoursValue = 0;
        } else if (hoursNumber > 23) {
            hoursValue = hoursNumber % 24;
        }
    }
    // get and validate selected minute
    var minutesValue = document.getElementById("add-timer-form").minute.value;
    if (minutesValue === "") {
        minutesValue = "*";
    } else {
        // verify limits of minute
        var minutesNumber = parseInt(minutesValue) || 0;
        if (minutesNumber < 0) {
            minutesValue = 0;
        } else if (minutesNumber > 59) {
            minutesValue = minutesNumber % 60;
        }
    }
    // get and validate selected days
    var daySelection = "";
    var daysElementArray = document.getElementById("add-timer-form").days;
    var daysTotal = daysElementArray.length;
    var daysRunner;
    for (daysRunner = 0; daysRunner < daysTotal; daysRunner++) {
        if (daysElementArray[daysRunner].checked) {
            var currentDayValue = daysElementArray[daysRunner].value;
            if (daySelection === "") {
                daySelection = currentDayValue;
            } else {
                daySelection += "," + currentDayValue;
            }
        }
    }
    if (daySelection === "") {
        daySelection = "*";
    }
    // build cron timer
    var cronTimer = "" + minutesValue + " " + hoursValue + " " + dayValue + " " + monthValue + " " +
                    daySelection;
    // save timer
    fn.requestWithPayload(
        "api/timers", JSON.stringify({cron: cronTimer}), "POST", function(err, res) {
            if (err) {
                ons.notification.toast(
                    err, {buttonLabel: "Dismiss", timeout: window.fn.toastErrorTimeout});
            }
            updateSettingsTimersPage();
        });
    hideNewTimerDialog();
}

// if timerId is set to -1, the timer is deleted
// eslint-disable-next-line no-unused-vars
var showAddTimerDialog = function(timerId) {
    if (timerId === -1) {
        clearNewTimerDialog();
    }
    document.getElementById("add-timer-dialog").show();
};

var hideNewTimerDialog = function() {
    document.getElementById("add-timer-dialog").hide();
};
