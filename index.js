const $ = require("jquery");
const fs = require("fs");
const dialog = require("electron").remote.dialog;
$(document).ready(
    function () {
        let db;
        $("#grid .cell").on("click", function() {
            let rid = Number($(this).attr("ri"));
            let cid = Number($(this).attr("ci"));
            let ciAdrr = String.fromCharCode(cid + 65);
            $("#address-container").val(ciAdrr +( rid+1));
        })

        $(".menu-items").on("click", function () {
            $(".menu-options-item").removeClass("selected");
            let id = $(this).attr("id");
            $(`#${id}-options`).addClass("selected");
        })

        $("#New").on("click", function () {
            db = [];
            // console.log("clicked");
            $("#grid").find(".row").each(function () {
                let row = [];
                $(this).find(".cell").each(function () {
                    // DB
                    let cell = false;
                    row.push(cell);
                    // UI
                    $(this).html("false");
                })
                db.push(row);
            })
            // console.log(db);
        })

        $("#grid .cell").on("keyup", function() {
            // updated db
            let rowId = $(this).attr("ri");
            let colId = $(this).attr("ci");
            db[rowId][colId] = $(this).html();
            console.log(db);
        })

        $("#Save").on("click", async function () {
            let sdb = await dialog.showOpenDialogSync();
            let jsonData = JSON.stringify(db);
            fs.writeFileSync(sdb.filePaths[0], jsonData);
        })

        $("#Open").on("click", async function () {
            let odb = await dialog.showOpenDialog();
            let fp = odb.filePaths[0];
            let content = await  fs.promises.readFileSync(fp);
            db = JSON.parse(content);
            // loop 
            let rows = $("#grid").find(".row");
            for (let i = 0; i < rows.length; i++) {
                let cRowCells = $(rows[i]).find(".cell");
                for (let j = 0; j < cRowCells.length; j++) {
                    // DB
                    $(cRowCells[j]).html(db[i][j]);
                }
            }
        })

        function init() {
            $("#File").trigger("click");
        }
        init();
    }
);