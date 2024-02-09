// const { openai } = require("../config/gptConfig");
// const mongoose = require("mongoose");
const PromptModel = require("../models/PromptModel");
const userModel = require("../models/userModel");
const { BardAPI } = require("bardapi");


require("dotenv").config();

module.exports.promptInput = async (req, res) => {
  try {
    const { question } = req.body;
    // const id = req.user.id;
    // const chat = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: `${question}`}],
    //   model: "gpt-3.5-turbo",
    // });

    // let myBard = new Bard('aQjJien1SWfzgrC-04TV-OQ1UUXnYP7Kq4WM7zLzyyE4FxDJheWRes5jJCulbquTq6u3-A')
    // let ans = await myBard.ask("hii how are you");
    // console.log(ans);

    // const _bard = new bardapi("[aQjJien1SWfzgrC-04TV-OQ1UUXnYP7Kq4WM7zLzyyE4FxDJheWRes5jJCulbquTq6u3-A.]")
    // const ans = await _bard.getAnswer('hii my name is siva');
    // console.log(ans);

    // const assistant = new BardAPI();

    // await assistant.setSession('__Secure-1PSID', 'bAjJiQAE4e1gmQwp0A8ZM7AjV6EuE_k86bm5Xxa9dSlSkfBq9K4ObcBZs6Vi2bPQ5HHSgg'); 
    // const ans = await assistant.getBardResponse('Hello, how are you?');
    // console.log(ans);

    // const bard = new Bard("bAjJiQAE4e1gmQwp0A8ZM7AjV6EuE_k86bm5Xxa9dSlSkfBq9K4ObcBZs6Vi2bPQ5HHSgg");

    // let ans = await bard.query('hii how are you');

    // console.log(ans);

    const bard = new BardAPI({sessionId : 'bAjJiRzCg_eMd1x3iUBb-noe5euFZpxPW3-b73GvO15wFBiazwctQM57bamsPmvp1XymQQ.'});

    const ans = await bard.ask({message : "hello how are you"});

    console.log(ans);




    // const answer = chat.choices[0].message.content;
    // const pair = await PromptModel.create({ question, answer });

    // const updateUser = await userModel.findByIdAndUpdate(
    //   { _id: id },
    //   {
    //     $push: {
    //       prompts: pair._id,
    //     },
    //   },
    //   { new: true }
    // );

    // const user = await userModel
    //   .findById({ _id: id })
    //   .populate("prompts")
    //   .exec();

    return res.status(200).json({
      success: true,
      message: ans
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.promptDelete = async(req,res)=>{
  try {
    const   userId = req.user.id;
    const {id} = req.body;
    const userPrompt =  await userModel.findByIdAndUpdate({_id : userId} ,{
      $pull: {
        prompts: id,
      },
    },
    { new: true } )
    const promptDel = await PromptModel.findByIdAndDelete({_id : id})
    res.status(200).json({
      success :true,
      message : "Prompt deleted successfull"
    })
  } catch (error) {
    res.status(500).json({
      success :false,
      message :error.message
    })
  }
}