package com.sandermendes.springboot.doctor.model;

import javax.persistence.*;

@Entity(name = "Doctor")
@Table(name = "doctor")
public class Doctor {

    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @Column(
            name = "name",
            nullable = false,
            columnDefinition = "TEXT",
            length = 120
    )
    private String name;

    @Column(
            name = "doc_cert_id",
            nullable = false,
            columnDefinition = "TEXT",
            length = 7
    )
    private String docCertId;

    @Column(
            name = "phone",
            nullable = false,
            columnDefinition = "TEXT",
            length = 11
    )
    private String phone;

    @Column(
            name = "mobile_phone",
            nullable = false,
            columnDefinition = "TEXT",
            length = 11
    )
    private String mobilePhone;

    public Doctor(String name, String docCertId, String phone, String mobilePhone) {
        this.name = name;
        this.docCertId = docCertId;
        this.phone = phone;
        this.mobilePhone = mobilePhone;
    }

    public Doctor() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDocCertId() {
        return docCertId;
    }

    public void setDocCertId(String docCertId) {
        this.docCertId = docCertId;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    @Override
    public String toString() {
        return "Doctor{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", docCertId='" + docCertId + '\'' +
                ", phone='" + phone + '\'' +
                ", mobilePhone='" + mobilePhone + '\'' +
                '}';
    }
}
