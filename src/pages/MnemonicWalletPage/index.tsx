import React, {useState} from "react";
import * as bip39 from "bip39";
import * as ecc from "tiny-secp256k1";
import {BIP32Factory} from "bip32";
import {Wallet} from "ethers";
import {Buffer} from "buffer";
import {
  AlertTriangle,
  CheckCircle,
  Copy,
  Download,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  QrCode,
  ShieldCheck,
} from "lucide-react";
import {Modal, notification, Tooltip} from "antd";

const bip32 = BIP32Factory(ecc);

const SecureMnemonicWallet: React.FC = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mnemonic, setMnemonic] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [address, setAddress] = useState("");
  const [keystore, setKeystore] = useState("");
  const [loading, setLoading] = useState(false);
  const [canCopy, setCanCopy] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const generateWallet = async () => {
    setLoading(true);
    setCanCopy(false);
    try {
      const mnemonic = bip39.generateMnemonic();
      const seed = bip39.mnemonicToSeedSync(mnemonic, password);
      const root = bip32.fromSeed(seed);
      const child = root.derivePath("m/44'/60'/0'/0/0");
      const privateKey = child.privateKey ? Buffer.from(child.privateKey).toString("hex") : "";
      const pubKey = child.publicKey ? Buffer.from(child.publicKey).toString("hex") : "";
      const wallet = new Wallet(privateKey);
      const keystoreJson = await wallet.encrypt(password);
      setMnemonic(mnemonic);
      setPublicKey(pubKey);
      setAddress(wallet.address);
      setKeystore(keystoreJson);
    } catch {
      setMnemonic("生成失败，请检查依赖");
      setPublicKey("");
      setAddress("");
      setKeystore("");
    } finally {
      setLoading(false);
    }
  };

  // 复制功能必须弹窗确认 + 5秒强制阅读倒计时
  const handleEnableCopy = () => {
    let seconds = 5;
    let timer: NodeJS.Timeout | null = null;
    const currentOkText = `(${seconds})秒后可确认`;

    const modal = Modal.confirm({
      title: (
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500"/>
          <span>开启复制前风险提示</span>
        </div>
      ),
      icon: null,
      content: (
        <div className="pt-2 text-base">
          <p>复制钱包助记词、公钥、私钥等敏感信息，存在剪切板泄漏风险，可能被恶意软件窃取。</p>
          <p className="mt-2 text-yellow-700 font-semibold">请确保当前环境安全，并妥善管理您的敏感信息。</p>
        </div>
      ),
      okText: currentOkText,
      okButtonProps: {disabled: true},
      cancelText: "取消",
      centered: true,
      onOk() {
        setCanCopy(true);
      },
      onCancel() {
        if (timer) clearInterval(timer);
      }
    });

    timer = setInterval(() => {
      seconds -= 1;
      if (seconds > 0) {
        modal.update({
          okText: `(${seconds})秒后可确认`,
          okButtonProps: {disabled: true}
        });
      } else {
        modal.update({
          okText: "我已了解风险，确定开启",
          okButtonProps: {disabled: false}
        });
        if (timer) clearInterval(timer);
      }
    }, 1000);
  };

  // 通用复制方法
  const handleCopy = async (content: string, label: string) => {
    if (!canCopy) return;
    try {
      await navigator.clipboard.writeText(content);
      api.success({
        message: (
          <span className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500"/>
            <span>{label} 已复制到剪切板</span>
          </span>
        ),
        placement: "top",
        duration: 2,
      });
    } catch {
      api.error({
        message: `${label} 复制失败，请手动复制。`,
        placement: "top",
        duration: 2,
      });
    }
  };

  // Keystore下载
  const handleDownloadKeystore = () => {
    const blob = new Blob([keystore], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const fileName = `keystore_${address.slice(0, 8)}.json`;
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const copyClass = canCopy ? "select-auto" : "select-none";

  // Google风格信息块
  const renderCopyBlock = (
    label: string,
    value: string,
    field: "助记词" | "公钥" | "地址" | "Keystore",
    icon: React.ReactNode,
    extraBtn?: React.ReactNode
  ) => (
    <div className="flex flex-col gap-2 px-0 pb-2">
      {contextHolder}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-base text-gray-700 dark:text-gray-200">
          {icon}
          {label}
        </div>
        <div className="flex gap-2">
          {extraBtn}
          <Tooltip title={canCopy ? `复制${label}` : "需先开启复制"}>
            <button
              type="button"
              className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              onClick={() => handleCopy(value, field)}
              disabled={!canCopy}
            >
              <Copy className="w-5 h-5"/>
            </button>
          </Tooltip>
        </div>
      </div>
      <div
        className={`text-[15px] break-all whitespace-pre-wrap bg-transparent p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm ${copyClass}`}
        style={{
          fontFamily: "Fira Mono, monospace",
          letterSpacing: ".01em",
          background: "white",
        }}
      >
        {value}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-[#151617] flex flex-col items-center justify-center px-4 py-10">
      {/* Google风格Logo和标题 */}
      <div className="mb-10 flex flex-col items-center">
        <LockKeyhole className="w-12 h-12 mb-3 text-blue-500 dark:text-blue-400"/>
        <span className="text-[46px] font-extrabold tracking-wide"
              style={{
                fontFamily: "Product Sans, Google Sans, Arial, Helvetica, sans-serif",
                color: "#4285F4",
                letterSpacing: "-0.03em",
                wordSpacing: "-0.1em",
                background: "linear-gradient(90deg,#4285F4,#ea4335,#fbbc05,#34a853)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
        >
          Mnemonic Wallet
        </span>
        <span className="text-gray-500 dark:text-gray-300 text-base mt-1">
          基于密码生成助记词和加密钱包 Keystore
        </span>
      </div>

      {/* Main Card */}
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#18181c] rounded-[2.5rem] shadow-[0_6px_32px_0_rgba(80,80,100,0.11)] border border-gray-100 dark:border-gray-800 p-0 sm:p-0">
        <div className="p-8 pt-10">
          {/* 密码输入 */}
          <div className="mb-7">
            <label className="flex items-center gap-2 text-base font-medium mb-2 text-gray-800 dark:text-gray-200">
              <ShieldCheck className="w-5 h-5 text-blue-500"/>
              设置密码
              <span className="text-xs text-gray-400">(用于加密 Keystore)</span>
            </label>
            <div className="flex items-center relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="请输入强密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 border-0 rounded-full shadow-[0_2px_10px_0_rgba(80,80,100,0.08)] bg-[#f7f8fa] dark:bg-[#232326] text-base text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-400 transition"
                autoComplete="new-password"
              />
              <button
                className="absolute right-4 text-gray-400 hover:text-blue-600"
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
              </button>
            </div>
          </div>
          {/* 生成&复制按钮 */}
          <div className="flex gap-2 mb-10">
            <button
              onClick={generateWallet}
              className="flex-1 bg-[#4285F4] hover:bg-[#357ae8] text-white py-3 rounded-full font-semibold text-base shadow-md transition"
              disabled={loading || !password}
            >
              {loading ? "生成中..." : "生成助记词钱包"}
            </button>
            <button
              onClick={handleEnableCopy}
              className="flex-1 bg-[#FFF5CC] dark:bg-yellow-700 text-yellow-700 dark:text-yellow-200 py-3 rounded-full font-semibold text-base hover:bg-yellow-200 dark:hover:bg-yellow-600 shadow transition"
              disabled={canCopy || !mnemonic}
              type="button"
            >
              {canCopy ? "已允许复制" : "开启复制"}
            </button>
          </div>

          {/* 信息区 */}
          {mnemonic && (
            <div className="space-y-6">
              {renderCopyBlock("助记词", mnemonic, "助记词", <KeyRound className="w-5 h-5 text-blue-400"/>)}
              {renderCopyBlock("公钥", publicKey, "公钥", <QrCode className="w-5 h-5 text-purple-400"/>)}
              {renderCopyBlock("地址", address, "地址", <KeyRound className="w-5 h-5 text-green-500"/>)}
              {renderCopyBlock(
                "Keystore JSON（加密）",
                keystore,
                "Keystore",
                <Download className="w-5 h-5 text-orange-400"/>,
                <Tooltip title="下载 Keystore JSON 文件">
                  <button
                    type="button"
                    className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={handleDownloadKeystore}
                    disabled={!keystore}
                  >
                    <Download className="w-5 h-5"/>
                  </button>
                </Tooltip>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 text-xs text-gray-400 text-center">
        仅用于本地浏览器安全演示，不上传任何数据。请妥善保管助记词与私钥！
      </div>
    </div>
  );
};

export default SecureMnemonicWallet
