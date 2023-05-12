import AOS from "aos";
import "aos/dist/aos.css";

export default defineNuxtPlugin(() => {
  if (typeof window !== "undefined") {
    AOS.init({
      once: false,
    });
  }
});
