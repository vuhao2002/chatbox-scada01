type Props = {
  message: {
    chatID: string;
    text: string;
    name: string;
  };
};

function Message({ message }: Props) {
  console.log(message);
  const isChatGPT = message.name === "ChatGPT";

  return (
    <div className={`py-5 ${isChatGPT && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img
          src={
            isChatGPT
              ? "https://links.papareact.com/89k"
              : "https://lh3.googleusercontent.com/a/ACg8ocLfGMAE5FrxiB0tS1YfAPm4LaXXLogfMG14YI8luIT5=s96-c"
          }
          alt=""
          className="h-8 w-8 rounded-sm"
        />
        <div className="min-h-[20px] flex flex-col items-start gap-3 overflow-x-auto whitespace-pre-wrap break-words">
          <div className="pt-1 text-sm overflow-auto resize-none">
            {message.text}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
