//유저가 값을 입력한다
// +버튼을 클릭하면, 할일이 추가된다
// delete버튼을 누르면 할일이 삭제된다
// check버튼을 누르면 할일이 끝나고 밑줄이간다
// 1. check버튼을 클릭하면 false -> true로 바뀜
// 2. true이면 끝난걸로 간주하고 밑줄 긋기
// 3. false 이면 안끝난걸로 간주하고 그대로 둔다 
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은 끝난탭만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴 

let taskInput = document.getElementById("task_input");
//console.log(task_input); 잘됬는지 확인하면서 하기 
let addButton = document.getElementById("add_button");
let tabs = document.querySelectorAll(".task_tabs div");
let taskList = [] ;
let mode ="all";
let filterList = [] 
addButton.addEventListener("mousedown",addTask);
taskInput.addEventListener("keydown",function(event){
        if(event.keyCode===13){
            addTask(event);
        }
    });

//탭에 클릭이벤트 주는 법 
for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){
        filter(event)
    });
}

// 할일 추가하기 
function addTask(){
    //console.log("clicked"); 확인하는 과정 
    //객체로 만들어주기 
    //랜덤 아이디 값 지정해주기 (함수는 구글 참고함)
    let taskValue = taskInput.value;
    let task = {
        id: randomIDGenerate(),
        taskContent: taskValue,
        isComplete:false //완료됐어? 기본값 false
    };
    taskList.push(task);
    taskInput.value= "";
    render();
}

//화면에 할일 보여주는(UI) 함수
function render(){
    let list =[]
    if (mode =="all"){
        list = taskList;
    }else if(mode == "ongoing"|| mode=="done"){
        list = filterList;
    }
    let resultHTML = "";
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML +=`<div class="task">
            <div class="task_done">${list[i].taskContent}</div> 
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        }else{
            resultHTML +=`<div class="task">
            <div>${list[i].taskContent}</div> 
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
    </div>`;
    }
}
    document.getElementById("task_board").innerHTML = resultHTML;
}


//클릭하면 id가 있는 객체의 isComplete를 true로 바꿔준다 
function toggleComplete(id){
    console.log("id:",id)
    // id로 task찾기 
    for(let i=0; i<taskList.length;i++){
        if (taskList[i].id== id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            //false 였는데 !false니까 true 이다.
            //밑줄 쳤다 안쳤다 하는 법 
            break ;
    }
} render();  // 함수 꼭 부르기 
console.log(taskList) 
}

function deleteTask(id){
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    console.log(taskList)
    render()
    }

function filter(event){
    mode=event.target.id
    filterList = [] //전역변수로 위에 선언해놓음
    //console.log("filter 클릭됨",event.target.id);
    document.getElementById("under_line").style.width = 
    event.target.offsetWidth+"px";
    document.getElementById("under_line").style.top = 
    event.target.offsetTop+event.target.offsetHeight + "px"
    document.getElementById("under_line").style.left = 
    event.target.offsetLeft+"px";

    if(mode == "all"){
        render()
    }else if(mode=="ongoing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]) //id를 확인하면서 false인 값만 filterList에 다시 넣어라
            }
        }        
        render();
    }else if(mode =="done"){
        for(let i=0; i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}

// 랜덤한 아이디값을 부여하는 함수
//*왜냐하면 어떤값을 체크하고 지우고 할지 모르니까 
function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);}
