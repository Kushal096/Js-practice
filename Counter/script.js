let lock = true; 

const inputCatch = () => {
    if (lock) {
        const values = document.querySelector("#inbox").value;
        console.log(values)
        const totalCount = document.getElementById("totalCount");
        const arr = values.trim().split(/\s+/);
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '') {
                continue;
            }
            count ++
        }
        totalCount.innerText = count;
    }
    else {
        const values = document.querySelector("#inbox").value;
        const totalCount = document.getElementById("totalCount");
        let count = 0;
        
        for (let char of values) {
            if (["\n", " "].includes(char)) {
                continue;
            } else {
                count++;
            }
        }
        totalCount.innerText = count;
    }
}


const toggle = document.getElementById("countToggle");
toggle.addEventListener('change', () => {
    lock = !toggle.checked;
    inputCatch();
});
