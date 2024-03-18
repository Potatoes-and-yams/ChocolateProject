async function searchStudent() {
    const name = document.getElementById("name").value;
    const response = await fetch("students.json");
    const data = await response.json();
    const matchingStudents = data.filter(student => student.name === name);
    const resultDiv = document.getElementById("result");
    if (matchingStudents.length > 0) {
        resultDiv.innerText = JSON.stringify(matchingStudents, null, 2);
    } else {
        resultDiv.innerText = "未找到姓名为 '" + name + "' 的学生信息";
    }
}

async function addStudent() {
    const newName = document.getElementById("newName").value;
    const newAge = document.getElementById("newAge").value;
    const newGender = document.getElementById("newGender").value;
    const newGrade = document.getElementById("newGrade").value;

    if (!newName || !newAge || !newGender || !newGrade) {
        alert("请填写完整的学生信息");
        return;
    }

    const newStudent = {name: newName, age: newAge, gender: newGender, grade: newGrade};

    try {
        // 获取原文件内容
        const fileResponse = await fetch("https://api.github.com/repos/Potatoes-and-yams/ChocolateProject/contents/students.json");
        const fileData = await fileResponse.json();
        const fileContent = atob(fileData.content);

        // 将新学生信息添加到原文件内容中
        const parsedContent = JSON.parse(fileContent);
        parsedContent.push(newStudent);

        // 更新文件内容
        const updatedContent = JSON.stringify(parsedContent);
        const updatedContentEncoded = btoa(updatedContent);

        // 提交修改
        const updateResponse = await fetch("https://api.github.com/repos/Potatoes-and-yams/ChocolateProject/contents/students.json", {
            method: "PUT",
            headers: {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: "Add new student",
                content: updatedContentEncoded,
                sha: fileData.sha
            })
        });

        if (updateResponse.ok) {
            alert("学生信息添加成功");
        } else {
            alert("学生信息添加失败，请检查网络连接或稍后重试");
        }
    } catch (error) {
        console.error("添加学生信息失败:", error);
        alert("添加学生信息失败，请查看控制台获取更多信息");
    }
}



function redirectToOtherPage() {
    window.location.href = "otherPage.html";
}
