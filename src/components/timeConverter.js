import moment from "moment";
export const currTime = (ms) => {
    let timeInMilliSec = ms;
    const date = new Date(timeInMilliSec * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const time = hours + ":" + minutes.substr(-2);
    const number = moment(time, ["HH.mm"]).format("hh:mm a");
    return number;
  };