import CalendarScreen from "../screens/Calendar"
import CategoryManagerScreen from "../screens/CategoryManager"
import DashboardScreen from "../screens/Dashboard"
import RewardManagerScreen from "../screens/RewardManager"
import TasksScreen from "../screens/Tasks"


export default [
    {
        name:'Dashboard',
        component: DashboardScreen
    },
    {
        name:'Tasks',
        component: TasksScreen
    },
    {
        name:'Category Manager',
        component: CategoryManagerScreen
    },
    {
        name:'Reward Manager',
        component: RewardManagerScreen
    }
]