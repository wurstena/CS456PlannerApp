import moment from 'moment';
var tasks = [];
var completedTasks = [];
var rewards = [];
var categories = [];
// var priority_indexes = [0, 1, 2];
var priority_tasks = [];
var global_key = 0

export default function saveTasks(task) {
  let index = tasks.length
  task.key = global_key
  global_key++;
  tasks.push(task)
  if (tasks.length <= 3) {
    priority_tasks.push(task)
  }
  sortArrayByDate(tasks)
}

export function completeTask(index) {
  let completed_task = tasks[index]
  let key = completed_task.key;
  let priority_index = -1
  for (var i in priority_tasks) {
    if (priority_tasks[i].key == key) {
      priority_index = i
    }
  }
  completedTasks.push(completed_task);
  tasks.splice(index, 1)
  sortArrayByDate(tasks)
  if (priority_index != -1) {
    priority_tasks.splice(priority_index, 1)
    for (var i in tasks) {
      if (!priority_tasks.includes(tasks[i])) {
        priority_tasks.push(tasks[i])
        break;
      }
    }
  }
  // console.log(priority_tasks)
  sortArrayByDate(priority_tasks)
  sortArrayByDate(completedTasks)
}

export function completePriorityTask(index) {
  let completed_task = priority_tasks[index]
  let key = completed_task.key;
  let base_index = -1
  for (var i in tasks) {
    if (tasks[i].key == key) {
      base_index = i
    }
  }
  completedTasks.push(completed_task);
  priority_tasks.splice(index, 1)
  if (base_index != -1) {
    tasks.splice(base_index, 1)
  }

  sortArrayByDate(tasks)
  for (var i in tasks) {
    if (!priority_tasks.includes(tasks[i])) {
      priority_tasks.push(tasks[i])
      break;
    }
  }
  // console.log(priority_tasks)
  sortArrayByDate(priority_tasks)
  sortArrayByDate(completedTasks)
}

export function deleteTask(index) {
  tasks.splice(index, 1)
  sortArrayByDate(tasks)
}

export function saveCategory(category) {
  categories.push(category)
}

export function deleteCategory(index) {
  categories.splice(index, 1)
}

export function saveReward(reward) {
  rewards.push(reward)
}

export function deleteReward(index) {
  rewards.splice(index, 1)
}

export function getGraphData() {
  // sortArrayByDate(tasks)
  return [tasks.length, completedTasks.length]
}

export function getPriorityData() {
  return priority_tasks
}

export function shufflePriorityData() {
  if (tasks.length >= 3) {
    let index_1 = Math.floor(Math.random() * tasks.length);
    let index_2 = Math.floor(Math.random() * tasks.length);
    while (index_2 == index_1) {
      index_2 = Math.floor(Math.random() * tasks.length);
    }
    let index_3 = Math.floor(Math.random() * tasks.length);
    while (index_3 == index_2 || index_3 == index_1) {
      index_3 = Math.floor(Math.random() * tasks.length);
    }
    priority_tasks = [tasks[index_1], tasks[index_2], tasks[index_3]]
    sortArrayByDate(priority_tasks)
  }
}

export function getTasksData() {
  // sortArrayByDate(tasks)
  // sortArrayByDate(completedTasks)
  return tasks
}

export function getTodayTasks() {
  let todays_tasks = []
  var now = moment();
  for (var i in tasks) {
    var task_date = moment(tasks[i].date);
    if (moment(now).isSame(task_date, "day")) {
      todays_tasks.push(tasks[i])
    }
  }
  return todays_tasks
}

export function getThisWeekTasks() {
  let todays_tasks = []
  var now = moment();
  for (var i in tasks) {
    var task_date = moment(tasks[i].date);
    if (now.isoWeek() == task_date.isoWeek()) {
      todays_tasks.push(tasks[i])
    }
  }
  return todays_tasks
}

export function getThisMonthTasks() {
  let todays_tasks = []
  var now = moment();
  for (var i in tasks) {
    var task_date = moment(tasks[i].date);
    if (now.month() == task_date.month()) {
      todays_tasks.push(tasks[i])
    }
  }
  return todays_tasks
}

export function getCompletedTaskData() {
  // sortArrayByDate(tasks)
  // sortArrayByDate(completedTasks)
  return completedTasks
}

export function getRewards() {
  return rewards
}

export function getCategories() {
  return categories
}

function sortArrayByDate(arr) {
  arr.sort(function (x, y) {
    if (x.date < y.date) {
      return -1;
    }
    if (x.date > y.date) {
      return 1;
    }
    if (x.date == y.date) {
      if (x.time < y.time) {
        return -1;
      }
      if (x.time > y.time) {
        return 1
      }
    }
    return 0;
  });
}

export { rewards as rewards_list }
export { categories as category_list }
export { tasks as task_list }
export { completedTasks as completed_task_list }