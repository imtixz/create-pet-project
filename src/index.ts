import inquirer from "inquirer";

const prompt = inquirer.createPromptModule();

const initiateProject = async (
  routes: string[],
  databases: string[],
  authentication: string = ""
) => {
  const includeAuth =
    authentication == "" || authentication == "None" ? false : true;
  console.log(routes);
  console.log(databases);
  console.log(includeAuth);
  if (includeAuth) {
    console.log(authentication);
  }
};

async function main() {
  const results = await prompt([
    {
      type: "checkbox",
      name: "Which route types to add",
      choices: ["TRPC", "REST"],
    },
    {
      type: "checkbox",
      name: "Which database(/s) to add",
      choices: ["Postgres", "Mongo", "Redis"],
    },
  ]);

  const routes: string[] = results["Which route types to add"];
  const databases: string[] = results["Which database(/s) to add"];

  if (databases.includes("Mongo")) {
    const _res = await prompt([
      {
        type: "list",
        name: "Which authorization strategy to add",
        choices: ["None", "JWT Tokens", "Session Token"],
      },
    ]);
    const authentication: string = _res["Which authorization strategy to add"];
    await initiateProject(routes, databases, authentication);
  } else {
    await initiateProject(routes, databases);
  }
}

main();
