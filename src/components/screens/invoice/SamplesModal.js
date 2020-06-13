import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Input, Button, Icon } from "semantic-ui-react";

import Modal from "../../UI/modal/Modal";
import DiscountModal from "./DiscountModal";
import TaxModal from "./TaxModal";
import InvoiceModal from "./InvoiceModal";
import IsPaidModal from "./IsPaidModal";
import ListItemWith2Selects, { SubItems } from "../../UI/list/ListItemWith2Selects";
import MethodsModal from "./MethodsModal";

import { getSamples } from "../../../store/actions/sampleActions";
import { printFactor } from "../../../store/actions/requestActions";
import { showDialog } from "../../../store/actions/dialogActions";

const SamplesModal = (props) => {
  const [samples, setSamples] = useState([]);
  const [invoice, setInvoice] = useState({ price: "", discount: "", tax: 0 });
  const [selectedSample, setSelectedSample] = useState(0);
  const [selectedDiscount, setSelectedDiscount] = useState(0);
  const [MethodsModalStatus, setMethodsModalStatus] = useState(false);
  const [discountModalStatus, setDiscountModalStatus] = useState(false);
  const [taxModalStatus, setTaxModalStatus] = useState(false);
  const [invoiceModalStatus, setInvoiceModalStatus] = useState(false);
  const [isPaideModalStatus, setIsPaidModalStatus] = useState(false);
  const [periodKey, setPeriodKey] = useState("-");

  useEffect(() => {
    if (props.open) {
      loadSamples();
    }
    // eslint-disable-next-line
  }, [props.requestId]);

  // Load samples
  const loadSamples = async () => {
    const results = await props.getSamples(props.requestId);

    if (results) {
      setSamples(results.rows);
      setPeriodKey(results.key);
      setInvoice(results.invoice[0]);
      console.log(results.invoice[0]);
    }
  };

  // Handle methods button click
  const handleMethodClick = (id) => {
    setSelectedSample(id);
    setMethodsModalStatus(true);
  };

  // Handle methods button click
  const handleDiscountClick = (id, discount) => {
    setSelectedSample(id);
    setSelectedDiscount(discount);
    setDiscountModalStatus(true);
  };

  // Handle tax button click
  const handleTaxButtonClick = () => {
    setTaxModalStatus(true);
  };

  // Handle methods button click
  const handleIsPaidButtonClick = () => {
    setIsPaidModalStatus(true);
  };

  // Handle print invoice click
  const handlePrintInvoice = () => {
    setInvoiceModalStatus(true);
  };

  // Handle print factor click
  const handlePrintFactor = async () => {
    const result = await props.printFactor(props.requestId);

    if (result) {
      if (result.data) {
        const file = new Blob([result.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }
    }
  };

  // Thousands separator
  const thousands_separators = (num) => {
    return num === null ? 0 : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Fragment>
      <Modal
        open={props.open}
        title="نمونه ها"
        cancel={() => {
          props.setRequestId(0);
          props.setOpen(false);
        }}
        // save={handleSaveRequest}
      >
        {/* Start actions */}
        <div className="actions pt-4 pb-5 align-left">
          <Button icon labelPosition="right" className="mb-2" color="blue" size="tiny" onClick={handlePrintInvoice}>
            فاکتور رسمی
            <Icon name="print" />
          </Button>
          <Button icon labelPosition="right" className="mb-2" color="blue" size="tiny" onClick={handlePrintFactor}>
            چاپ پیش فاکتور
            <Icon name="print" />
          </Button>
          <Button icon labelPosition="right" size="tiny" className="mb-2" color="blue" onClick={handleTaxButtonClick}>
            ویرایش مالیات
            <Icon name="edit" />
          </Button>
          <Button
            icon
            labelPosition="right"
            size="tiny"
            className="mb-2"
            color="blue"
            onClick={handleIsPaidButtonClick}
          >
            تسویه حساب
            <Icon name="edit" />
          </Button>
        </div>
        {/* End actions */}

        {/* Start list */}
        <div style={{ height: "350px", overflowY: "auto" }} className="container">
          {samples.map((item) => {
            return (
              <ListItemWith2Selects
                id={item.id}
                key={item.id}
                onClick={() => handleMethodClick(item.id)}
                title="هزینه ها"
                icon="dollar sign"
                otherTitle="تخفیف"
                otherIcon="tag"
                onOther={() => {
                  handleDiscountClick(item.id, item.discount);
                }}
              >
                <SubItems data={["کد شناسایی نمونه:", "S" + periodKey + "-" + item.num, "نام نمونه:", item.name]} />
                <SubItems data={["نام تجاری:", item.businnessName, "نام شرکت:", item.company]} />
                <SubItems
                  data={["وضعیت:", item.unanswered > 0 ? "ناتمام" : "اتمام", "مبلغ", thousands_separators(item.price)]}
                />
                <SubItems data={["تخفیف:", thousands_separators(item.discount), "", ""]} />
              </ListItemWith2Selects>
            );
          })}
        </div>
        {/* End list */}

        <fieldset className="p-3 mx-0">
          <legend>صورتحساب</legend>
          <div className="field-wrapper field-50 right-50">
            <label>جمع کل مبلغ:</label>
            <Input
              type="text"
              name="price"
              value={thousands_separators(invoice.price)}
              disabled
              // onChange={handleInput}
            />
          </div>
          <div className="field-wrapper field-50 left-50">
            <label>جمع تخفیف:</label>
            <Input
              type="text"
              name="discount"
              value={thousands_separators(invoice.discount)}
              // onChange={handleInput}
              disabled
            />
          </div>

          <div className="clearfix"></div>
          <div className="line-break"></div>

          <div className="field-wrapper field-50 right-50">
            <label>جمع کل مبلغ با تخفیف:</label>
            <Input
              type="text"
              name="priceWithDiscount"
              value={thousands_separators(invoice.price - invoice.discount)}
              disabled
              // onChange={handleInput}
            />
          </div>
          <div className="field-wrapper field-50 left-50">
            <label>میزان مالیات(%):</label>
            <Input
              type="text"
              name="tax"
              value={thousands_separators(invoice.tax)}
              disabled
              // onChange={handleInput}
            />
          </div>

          <div className="clearfix"></div>
          <div className="line-break"></div>

          <div className="field-wrapper field-50 right-50">
            <label>جمع مالیات:</label>
            <Input
              type="text"
              name="totalTax"
              value={thousands_separators(((invoice.price - invoice.discount) * invoice.tax) / 100)}
              disabled
              // onChange={handleInput}
            />
          </div>
          <div className="field-wrapper field-50 left-50">
            <label>جمع کل مبلغ با مالیات:</label>
            <Input
              type="text"
              name="totalPrice"
              value={thousands_separators(
                invoice.price - invoice.discount + ((invoice.price - invoice.discount) * invoice.tax) / 100
              )}
              // onChange={handleInput}
              disabled
            />
          </div>
        </fieldset>
      </Modal>

      <MethodsModal
        setOpen={setMethodsModalStatus}
        open={MethodsModalStatus}
        sampleId={selectedSample}
        setSampleId={setSelectedSample}
        loadSamples={loadSamples}
        loadRequests={props.loadRequests}
      />

      <DiscountModal
        open={discountModalStatus}
        setOpen={setDiscountModalStatus}
        id={selectedSample}
        price={selectedDiscount}
        loadSamples={loadSamples}
      />

      <TaxModal
        open={taxModalStatus}
        setOpen={setTaxModalStatus}
        id={props.requestId}
        price={invoice.tax}
        loadSamples={loadSamples}
      />

      <InvoiceModal
        open={invoiceModalStatus}
        setOpen={setInvoiceModalStatus}
        id={props.requestId}
        invoice={props.invoice}
        loadRequests={props.loadRequests}
      />

      <IsPaidModal
        open={isPaideModalStatus}
        setOpen={setIsPaidModalStatus}
        id={props.requestId}
        isPaid={props.isPaid}
        loadRequests={props.loadRequests}
      />
    </Fragment>
  );
};

SamplesModal.propTypes = {
  requestId: PropTypes.number.isRequired,
  setRequestId: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  loadRequests: PropTypes.func.isRequired,
  invoice: PropTypes.number,
  isPaid: PropTypes.number,
};

export default connect(null, { getSamples, showDialog, printFactor })(SamplesModal);
