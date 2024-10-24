import Button from "./components/Button";
import Cell from "./components/Cell";
import CelebrationAnimation from "./CelebrationAnimation";
import AnimatedModal from "./AnimatedModal";

interface InfoScreenTypes {
  onClick: () => void;
  defaultMsg: string | undefined;
  isCelebrationVisible: boolean;
  isVisible: boolean;
  buttonText: string;
  infoText: string | undefined;
  subText: string | undefined;
}

const InfoScreen = ({
  infoText = "infoText",
  onClick,
  defaultMsg = "defaultText",
  subText = "subText",
  isCelebrationVisible = false,
  isVisible = false,
  buttonText = "Дальше",
}: InfoScreenTypes) => {
  return (
    <AnimatedModal onClose={onClick} isVisible={isVisible}>
      <>
        <CelebrationAnimation isVisible={isCelebrationVisible} />
        <div className="w-full p-4 space-y-4 text-black bg-gray-200 rounded-lg ">
          <div className="">{infoText}</div>
          <Cell type="green" className="h-auto">
            <div className="w-full px-2">
              <div className="">{defaultMsg}</div>
              <div className="text-sm italic text-right">{subText}</div>
            </div>
          </Cell>
          <div className="">
            <Button onClick={onClick}>{buttonText}</Button>
          </div>
        </div>
      </>
    </AnimatedModal>
  );
};
export default InfoScreen;
