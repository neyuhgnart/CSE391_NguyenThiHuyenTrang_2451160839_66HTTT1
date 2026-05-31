const formState = {
    fullname: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false
};

const form = document.querySelector("#registerForm");
const submitBtn = document.querySelector("#submitBtn");
const successModal = document.querySelector("#successModal");
const modalSummary = document.querySelector("#modalSummary");
const closeModalBtn = document.querySelector("#closeModalBtn");

const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function setFieldStatus(fieldName, isValid) {
    const group = document.querySelector(`.form-group[data-field="${fieldName}"]`);
    formState[fieldName] = isValid;
    if (isValid) {
        group.classList.remove("invalid");
        group.classList.add("valid");
    } else {
        group.classList.remove("valid");
        group.classList.add("invalid");
    }
    checkFormValidity();
}
function checkFormValidity() {
    const isFormValid = Object.values(formState).every(status => status === true);
    submitBtn.disabled = !isFormValid;
}
function validateFullname(val) {
    const len = val.trim().length;
    return len >= 2 && len <= 50;
}
function validateEmail(val) {
    return REGEX_EMAIL.test(val.trim());
}
function checkPasswordStrength(val) {
    const bar = document.querySelector("#strengthBar");
    const txt = document.querySelector("#strengthText");
    bar.className = "strength-bar";
    if (val.length === 0) {
        txt.textContent = "Chưa nhập mật khẩu";
        txt.style.color = "inherit";
        return "none";
    }
    const hasLetter = /[a-zA-Z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    const hasUpper = /[A-Z]/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasSpecial = /[^a-zA-Z0-9]/.test(val);

    if (val.length < 8) {
        bar.classList.add("strength-weak");
        txt.textContent = "Mức độ: Yếu (Yêu cầu ≥ 8 ký tự)";
        txt.style.color = "var(--color-invalid)";
        return "weak";
    }
    if (hasUpper && hasLower && hasNumber && hasSpecial) {
        bar.classList.add("strength-strong");
        txt.textContent = "Mức độ: Mạnh";
        txt.style.color = "var(--color-valid)";
        return "strong";
    }
    if (hasLetter && hasNumber) {
        bar.classList.add("strength-medium");
        txt.textContent = "Mức độ: Trung bình";
        txt.style.color = "var(--color-warning)";
        return "medium";
    }
    bar.classList.add("strength-weak");
    txt.textContent = "Mức độ: Yếu (Cần bao gồm cả chữ và số)";
    txt.style.color = "var(--color-invalid)";
    return "weak";
}

form.addEventListener("input", (e) => {
    const target = e.target;
    const value = target.value;

    if (target.id === "fullname") {
        setFieldStatus("fullname", validateFullname(value));
    }
    if (target.id === "email") {
        setFieldStatus("email", validateEmail(value));
    }
    if (target.id === "password") {
        const strength = checkPasswordStrength(value);
        const isPassValid = (strength === "medium" || strength === "strong");
        setFieldStatus("password", isPassValid);
        const confirmField = document.querySelector("#confirmPassword");
        if (confirmField.value.length > 0) {
            setFieldStatus("confirmPassword", confirmField.value === value);
        }
    }
    if (target.id === "confirmPassword") {
        const passVal = document.querySelector("#password").value;
        setFieldStatus("confirmPassword", value === passVal && passVal.length > 0);
    }
    if (target.id === "phone") {
        let cleaned = value.replace(/\D/g, "");
        let formatted = "";
        if (cleaned.length > 0) {
            if (cleaned.length <= 4) {
                formatted = cleaned;
            } else if (cleaned.length <= 7) {
                formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
            } else {
                formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7, 10)}`;
            }
        }
        target.value = formatted;
        setFieldStatus("phone", cleaned.length === 10);
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const nameData = document.querySelector("#fullname").value.trim();
    const emailData = document.querySelector("#email").value.trim();
    const phoneData = document.querySelector("#phone").value;

    modalSummary.innerHTML = ""; 
    
    const details = [
        `Họ và tên: ${nameData}`,
        `Email: ${emailData}`,
        `Số điện thoại: ${phoneData}`
    ];
    details.forEach(textLine => {
        const p = document.createElement("p");
        p.textContent = textLine; 
        modalSummary.appendChild(p);
    });
    successModal.classList.add("open");
});

closeModalBtn.addEventListener("click", () => {
    successModal.classList.remove("open");
    form.reset();
    document.querySelectorAll(".form-group").forEach(group => {
        group.classList.remove("valid", "invalid");
    });
    document.querySelector("#strengthBar").className = "strength-bar";
    document.querySelector("#strengthText").textContent = "Chưa nhập mật khẩu";
    document.querySelector("#strengthText").style.color = "inherit";

    Object.keys(formState).forEach(key => formState[key] = false);
    checkFormValidity();
});