$(document).ready(()=>{
    $("#projects").tabs();
    $("ul").sortable({axis:"x", containments: "#projects"});
    $("ol").sortable({axis:"y", containments: "#projects"});
    $("#btnAddProject").button()
    .click(()=>{
        $("#project-dialog").dialog({
            width:400, resizable:false, modal: true, 
            buttons:{
                "Add new project": () =>{
                    var projectName = $("#new-project").val();
                    $("<li><a href=#" + projectName + ">" + projectName +"</a></li>")
                    .appendTo("#main");
                    $("<ol id='" + projectName + "'></ol>").appendTo("#projects");
                    $("#projects").tabs("refresh");
                    var tabCount = $("#projects .ut-tabs-nav li").length;
                    $("#projects").tabs("option", "active", tabCount -1);
                    
                    $("#new-project").val("");
                    $("#project-dialog").dialog("close");
                },
                "Cancel": () =>{
                    $("#new-project").val("");
                    $("#project-dialog").dialog("close");
                }
            }
        });
    });
    $("#btnAddList").button()
        .click(() =>{
            $("#task-dialog").dialog({
                width: 400, resizable: false, modal: true,
                buttons:{
                    "Add New Task": () =>{
                
                        var selectedTab = $("#projects .ui-tabs-panel:visible").attr("id");
                        var value =    $("#new-task").val();
                        $("<li><input type=\"checkbox\" value=" + value + " name=" + selectedTab + ">" + value +"</li>")
                        .appendTo("#" + selectedTab);
                        
                        $("#new-task").val("");
                        $("#task-dialog").dialog("close");
                    },
                    "Cancel": () => {
                        $("#new-task").val("");
                        $("#task-dialog").dialog("close");
                    }
                }
            })
        }
    );
    $("#removebtn").button()
    .click(() =>{
        var selectedTab = $("#projects .ui-tabs-panel:visible").attr("id");
        $.each($("li input[name=" + selectedTab +  "]:checked"), function(){
            $(this).parent('li').remove();
        });
    });
});