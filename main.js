let input = document.querySelector('input');
let button = document.querySelector('button');
let listItem = document.querySelector('ul');
let list = [];

if (localStorage.getItem('newValue')) {
    list = JSON.parse(localStorage.getItem('newValue'));
    render_item(list);
}


button.addEventListener('click', function() {
    let input_value = input.value;
    let item = {};
    item.task_name = input_value;
    add_data(item);
})

function add_data(params) {
    if (!params.task_name) {
        alert('Please check the task name')
        return false;
    }
    if (!params) return false;
    list.push(params);
    render_item(list);
}

function render_item(params) {
    if (!params) return false;
    document.querySelector('ul').innerHTML = '';

    for (let value of params) {
        let { task_name, status } = value;

        let done_class = '';
        if (status && status == 'done') {
            done_class = 'class="done"';
        }

        var newList = document.createElement('li')
        newList.innerHTML = `
            <span ${done_class}>${task_name}</span>
            <button class="complete">done</button>
            <button class="delete">delete</button>
            `

        localStorage.setItem('newValue', JSON.stringify(list));

        //Update
        newList.querySelector('button.complete').addEventListener('click', function() {
            update_task(status, value, newList)
        });
        // delete
        newList.querySelector('button.delete').addEventListener('click', function() {

            /** Tạo ra 1 array rỗng để lưu những task mới 
             * Kiểm tra xem task mới có trùng với task ở array mặc định hay không
             * Nếu trùng thì không push vào array rỗng mới
             * Clone lại array ban đầu bằng array mới
             */
            delete_task(newList, list, task_name)
        });

        listItem.appendChild(newList)
    }
}

function update_task(status, value, newList) {
    if (status && status === 'done') return false;
    value.status = 'done';

    newList.querySelector('span').classList.add('done')
    localStorage.setItem('newValue', JSON.stringify(list));
}

function delete_task(newList, list, task_name) {
    let newArray = [];
    let confirm_value = confirm(`You have actually delete ${task_name}`)
    if (confirm_value === true) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].task_name !== task_name) {
                newArray.push(list[i]); //comment
            }
        }
    } else {
        return false;
    }
    // list = [...newArray];
    // render_item(list);

    list = [...newArray];
    newList.remove();
    newArray.length = 0
    localStorage.setItem('newValue', JSON.stringify(list));
}