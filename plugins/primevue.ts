import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Card from "primevue/card";
import Divider from "primevue/divider";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import ScrollTop from "primevue/scrolltop";
import Sidebar from "primevue/sidebar";
import PanelMenu from "primevue/panelmenu";
import Menubar from "primevue/menubar";
import Checkbox from "primevue/checkbox";
import Calendar from "primevue/calendar";
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import SelectButton from "primevue/selectbutton";
import InputText from "primevue/inputtext";
import ProgressSpinner from "primevue/progressspinner";
import FileUpload from "primevue/fileupload";
import SplitButton from "primevue/splitbutton";
import Tag from "primevue/tag";
import Textarea from "primevue/textarea";
import Panel from "primevue/panel";
import InputSwitch from "primevue/inputswitch";
import TabMenu from "primevue/tabmenu";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import ColorPicker from "primevue/colorpicker";
import Skeleton from "primevue/skeleton";
import ToastService from "primevue/toastservice";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("Card", Card);
  nuxtApp.vueApp.component("Divider", Divider);
  nuxtApp.vueApp.component("Dialog", Dialog);
  nuxtApp.vueApp.component("Toast", Toast);
  nuxtApp.vueApp.component("ScrollTop", ScrollTop);
  nuxtApp.vueApp.component("Sidebar", Sidebar);
  nuxtApp.vueApp.component("PanelMenu", PanelMenu);
  nuxtApp.vueApp.component("Menubar", Menubar);
  nuxtApp.vueApp.component("Checkbox", Checkbox);
  nuxtApp.vueApp.component("Calendar", Calendar);
  nuxtApp.vueApp.component("InputNumber", InputNumber);
  nuxtApp.vueApp.component("Dropdown", Dropdown);
  nuxtApp.vueApp.component("SelectButton", SelectButton);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("ProgressSpinner", ProgressSpinner);
  nuxtApp.vueApp.component("FileUpload", FileUpload);
  nuxtApp.vueApp.component("SplitButton", SplitButton);
  nuxtApp.vueApp.component("Tag", Tag);
  nuxtApp.vueApp.component("Textarea", Textarea);
  nuxtApp.vueApp.component("Panel", Panel);
  nuxtApp.vueApp.component("InputSwitch", InputSwitch);
  nuxtApp.vueApp.component("TabMenu", TabMenu);
  nuxtApp.vueApp.component("TabView", TabView);
  nuxtApp.vueApp.component("TabPanel", TabPanel);
  nuxtApp.vueApp.component("ColorPicker", ColorPicker);
  nuxtApp.vueApp.component("Skeleton", Skeleton);
});
